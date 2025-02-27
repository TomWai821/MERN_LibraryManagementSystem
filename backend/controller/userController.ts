import { Request, Response } from 'express';
import { CreateUserInterface, LoginInterface, ChangeDataInterface } from '../model/requestInterface';
import { jwtSign, bcryptHash, comparePassword } from './hashing'
import { AuthRequest } from './middleware';
import { UserInterface } from '../model/userSchemaInterface';
import { CreateUser, FindUser, FindUserByID, FindUserByIDAndUpdate, FindUserWithData, GetUser, GetUserCount } from '../schema/user/user';

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
    const {username, email, status, role, gender} = req.body;
    const {page, limit} = req.query;
    
    try
    {
        let foundUser : UserInterface | UserInterface[] | null;
        const hasBodyParameter = username || email || status || role || gender;

        if(hasBodyParameter)
        {
            if(userId)
            {
                return res.status(400).json({success, error: "authToken is invalid while input another value in json"});
            }

            const query = 
            {
                // options i = Case insensitivity(Just like sql query)
                ...(username && {"username": {$regex: username, $options: "i"}}),
                ...(email && {"email": {$regex: email, $options: "i"}}),
                ...(status && {status}),
                ...(role && {role}),
                ...(gender && {gender}),
            };

            foundUser = await FindUserWithData(query);
        }
        else if(userId)
        {
            foundUser = await FindUserByID(userId) as UserInterface;

            if(!foundUser)
            {
                return res.status(401).json({success, error: "Invalid auth Token!"});
            }
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

export const ChangeUserData = async(req: AuthRequest, res:Response) => 
{
    const {oldUsername, newUsername, oldPassword, newPassword}:ChangeDataInterface = req.body;
    let success = false;
    const userId = req.user?._id;

    if(!userId)
    {
        return res.status(401).json({error: "Invalid auth Token!"});
    }

    try
    {
        const foundUser = await FindUserByID(userId);
        
        if(!foundUser)
        {
            return res.status(401).json({error : "Cannot found this account!"});
        }

        if(oldPassword && newPassword)
        {
            const compare = await comparePassword(oldPassword, foundUser.password);

            if(!compare)
            {
                return res.status(401).json({error : "Password Incorrect!"});
            }
            const hashPassword = await bcryptHash(newPassword);
            await FindUserByIDAndUpdate(userId, {password: hashPassword});
        }

        if(oldUsername && newUsername)
        {
            await FindUserByIDAndUpdate(userId, {username: newUsername});
        }

        success = true;
        res.json({success, message: "Change data successfully!"});

    }
    catch(error)
    {
        res.status(500).json({ error: "Internal Server Error!"});
    }
}