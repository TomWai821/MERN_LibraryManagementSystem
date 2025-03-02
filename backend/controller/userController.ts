import { Request, Response } from 'express';
import { CreateUserInterface, LoginInterface, ModifyUserDataInterface } from '../model/requestInterface';
import { jwtSign, bcryptHash, comparePassword } from './hashing'
import { AuthRequest } from './middleware';
import { UserInterface } from '../model/userSchemaInterface';
import { CreateUser, FindUser, FindUserByID, FindUserByIDAndDelete, FindUserByIDAndUpdate, FindUserWithData, GetUser, GetUserCount } from '../schema/user/user';
import { ObjectId } from 'mongoose';
import { CreateBanList, GetBanListCount } from '../schema/user/banList';
import { CreateDeleteList } from '../schema/user/deleteList';

export const UserRegister = async(req: Request, res: Response) =>
{
    const { email, username, password, gender, birthDay, role, status }: CreateUserInterface = req.body;
    let success = false;

    try
    {
        const user = await FindUser({ $or: [{ email }, { username }] });

        if(user)
        {
            if(user.email === email)
            {
                return res.status(400).json({success, error: "Email already in use"});
            }

            if(user.username === username)
            {
                return res.status(400).json({success, error: "Username already in use"});
            }
        }

        // Get amount of player and integrate the value to custom ID
        const userCount = await GetUserCount();
        const customID = "User-" + (userCount + 1).toString();
        
        // Hash password with bcrypt after validate email and username
        const hashedPassword = await bcryptHash(password); 

        // Create a new user after hashing the password
        const newUser = await CreateUser({ _id:customID, email, username, password: hashedPassword, gender, role, status, birthDay});
        
        // Get user id after create the user and Transfer user id as authToken with jsonWebToken
        const data = { user: { _id: newUser._id } }; 
        const authToken = await jwtSign(data); 
        success = true; 

        res.json({ success, message: "Register successfully!", data:{authToken, username, role: newUser.role} })
    }
    catch (error) 
    { 
        res.status(500).json({ success, error: 'Internal Server Error!' });
    }
}

export const UserLogin = async (req: Request, res: Response) =>
{
    const { email, password }: LoginInterface = req.body;
    let success = false;
    
    try 
    {
      const user = await FindUser({ email });
  
        if (!user) 
        {
            return res.status(400).json({ error: 'Invalid email address' });
        }
  
        if (user.status === "") 
        {
            return res.status(401).json({ error: 'This user was banned' });
        }
  
        const compare = await comparePassword(password, user.password);
  
        if (!compare) 
        {
            return res.status(400).json({ error: 'Invalid password' });
        }
  
        const data = { user: { _id: user._id } };
        const username = user.username;
        const role = user.role;
    
        const authToken: string = await jwtSign(data);
        success = true;
        res.json({ success, message: "Login Successfully!" , data:{username, role, authToken} });
    } 
    catch (error) 
    {
        res.status(500).json({ success, error: 'Internal Server Error!' });
    }
};

export const GetUserData = async(req: AuthRequest, res:Response) => 
{
    let success = false;
    const userId = req.user?._id;
    const tableName = req.params.tableName;
    const {username, email, status, role, gender, page, amount} = req.query;
    
    try
    {
        let foundUser : UserInterface | UserInterface[] | null;
        const hasBodyParameter = username || email || status || role || gender|| page || amount;

        if(userId)
        {
            if(!hasBodyParameter)
            {
                foundUser = await FindUserByID(userId) as UserInterface;
    
                if(!foundUser)
                {
                    return res.status(401).json({success, error: "Invalid auth Token!"});
                }
            }

            const query = 
            {
                // options i = Case insensitivity(Just like sql query)
                ...(username && {"username": {$regex: username}}),
                ...(email && {"email": {$regex: email, $options: "i"}}),
                ...(status && {status}),
                ...(role && {role}),
                ...(gender && {gender}),
            };

            foundUser = await FindUserWithData(tableName, query, amount as string, page as string, userId.toString());
        }
        else
        {
            foundUser = await GetUser();
        }
        
    
        success = true;
        res.send({success, foundUser});
    }
    catch(error)
    {
        res.status(500).json({ error: "Internal Server Error!" });
    }
}

export const ModifyUserData = async (req: AuthRequest, res: Response) => 
{
    const { username, email, gender, role, status, description, startDate, dueDate }: ModifyUserDataInterface = req.body;
    const userId = req.params.id as unknown as ObjectId;
    const adminID = req.user?._id;
    let success = false;

    if (!adminID) 
    {
        return res.status(401).json({ error: "Invalid auth Token!" });
    }

    try 
    {
        const foundUser = await FindUserByID(userId);
        
        if (!foundUser) 
        {
            return res.status(404).json({ error: "Cannot found this account!" });
        }

        const updateData: Record<string, any> = {};

        if (username && username !== foundUser.username) 
        {
            const existingUserByUsername = await FindUser({ username });

            if (existingUserByUsername) 
            {
                return res.status(400).json({ error: "Username already in use" });
            }
            updateData.username = username;
        }

        if (email && email !== foundUser.email) 
        {
            const existingUserByEmail = await FindUser({ email });

            if (existingUserByEmail) 
            {
                return res.status(400).json({ error: "Email already in use" });
            }
            updateData.email = email;
        }

        if (gender && gender !== foundUser.gender) 
        {
            updateData.gender = gender;
        }

        if (role && role !== foundUser.role) 
        {
            updateData.role = role;
        }

        if (Object.keys(updateData).length === 0 && !status) 
        {
            return res.status(400).json({ error: "No changes detected." });
        }

        const modifyData = await FindUserByIDAndUpdate(userId, updateData);

        if (!modifyData) 
        {
            return res.status(401).json({ error: "Failed to update data!" });
        }

        if(modifyData && (status !== foundUser.status))
        {
            const changeStatus = await ChangeStatus(userId, status, description, startDate, dueDate);
            const modifyStatus = await FindUserByIDAndUpdate(userId, {status});      
            
            if(!changeStatus || !modifyStatus)
            {
                res.status(200).json("Failed to Change Status!");
            }
        }

        success = true;
        res.json({ success, message: "Data updated successfully!" });
    } 
    catch (error) 
    {
        console.log(error);
        res.status(500).json({ error: "Internal Server Error!" });
    }
};

export const ChangeStatus = async (userId:ObjectId, status:string, description:string, startDate:Date, dueDate:Date) => 
{
    
    switch(status)
    {
        case "Banned":
            const banListCount = await GetBanListCount() + 1;
            const customBanListID = "BanList-" + banListCount.toString();
            return await CreateBanList({_id:customBanListID, userID: userId, description, startDate, dueDate});

        case "Delete":
            const deleteListCount = await GetBanListCount() + 1;
            const customDeleteListID = "DeleteList-" + deleteListCount.toString();
            return await CreateDeleteList({_id:customDeleteListID, userID: userId, startDate, dueDate});
        
        default:
            return new Error(`Invalid status: ${status}`);
    }
}

export const DeleteUser = async (req: AuthRequest, res: Response) => 
{
    const userId = req.params.id as unknown as ObjectId;
    const adminID = req.user?._id;
    let success = false;

    if (!adminID) 
    {
        return res.status(401).json({ error: "Invalid auth Token!" });
    }

    try 
    {
        const foundUser = await FindUserByID(userId);
        
        if (!foundUser) 
        {
            return res.status(404).json({ error: "Cannot found this account!" });
        }

        const deleteUser = await FindUserByIDAndDelete(userId);

        if(!deleteUser)
        {
            return res.status(401).json({ error: "Failed to delete user!" });
        }

        success = true;
        res.json({ success, message: "Delete user successfully!" });
    }
    catch(error)
    {
        console.log(error);
    }
}