import { Request, Response } from 'express';
import { AuthRequest, BodyInterfaceForDelete, CreateUserInterface } from '../model/requestInterface';
import { jwtSign, bcryptHash } from './hashing'
import { UserInterface } from '../model/userSchemaInterface';
import { CreateUser, FindUserByIDAndDelete, FindUserByIDAndUpdate } from '../schema/user/user';
import { FindBanListByID, FindBanListByIDAndUpdate } from '../schema/user/banList';
import { ObjectId } from 'mongoose';
import { FindDeleteListByID, FindDeleteListByIDAndUpdate } from '../schema/user/deleteList';
import { ChangeUserListStatus } from './middleware/userUpdateDataMiddleware';

export const UserRegister = async(req: Request, res: Response) =>
{
    const { email, username, password, gender, birthDay, role, status, avatarUrl }: CreateUserInterface = req.body;
    let success = false;

    try
    {   
        // Hash password with bcrypt after validate email and username
        const hashedPassword = await bcryptHash(password); 
    
        // Create a new user after hashing the password
        const newUser = await CreateUser({ email, username, password: hashedPassword, gender, role, status, birthDay, avatarUrl});

        if(!newUser)
        {
            return res.status(400).json({success, error: "Failed to create User"});
        }
        
        // Get user id after create the user and Transfer user id as authToken with jsonWebToken
        const data = { user: { _id: newUser?._id } }; 
        const authToken = await jwtSign(data); 
        success = true; 
    
        res.json({ success, message: "Register successfully!", data:{authToken, username, status: newUser.status, role: newUser.role, avatarUrl: avatarUrl} })
    }
    catch (error) 
    { 
        res.status(500).json({ success, error: 'Internal Server Error!' });
    }
}

export const UserLogin = async (req: AuthRequest, res: Response) =>
{
    const user = req.user as UserInterface;
    let success = false;
    
    try 
    {
        const data = { user: { _id: user._id } };
        const username = user.username;
        const role = user.role;
        const status = user.status;
        const avatarUrl = user.avatarUrl;
    
        const authToken: string = await jwtSign(data);
        success = true;
        res.json({ success, message: "Login Successfully!" , data:{username, role, authToken, status, avatarUrl} });
    } 
    catch (error) 
    {
        res.status(500).json({ success, error: 'Internal Server Error!' });
    }
};

export const BuildGetUserDataMessage = async (req: AuthRequest, res: Response) =>
{
    try 
    {
        const foundUser = req.foundUser;
        res.send({ success: true, foundUser });
    } 
    catch (error) 
    {
        res.status(500).json({ success: false, error: "Internal Server Error!" });
    }
};

export const ModifyUserData = async (req: AuthRequest, res: Response) => 
{
    const foundUser = req.foundUser as UserInterface;
    const updateData = req.updateData as Record<string, any>;
    let success = false;

    try 
    {
        const modifyData = await FindUserByIDAndUpdate(foundUser._id, updateData); 

        if(!modifyData)
        {
            return res.json({success, message: "Fail to update Data!"})
        }

        success = true;
        res.json({ success, message: "Data updated successfully!" });
    } 
    catch (error) 
    {
        res.status(500).json({ success, error: "Internal Server Error!" });
    }
};

export const ChangeStatus = async (req:AuthRequest, res:Response) => 
{
    const { banListID, deleteListID, statusForUserList, statusForBanList, statusForDeleteList, description, startDate, dueDate} = req.body;
    const foundUser = req.foundUser as UserInterface;
    let success = false;

    try
    {
        if(banListID)
        {
            const foundBannedList = await FindBanListByID(banListID);

            if(!foundBannedList)
            {
                return res.status(200).json({ success, error:"Invalid Ban List ID!"});
            }

            const UpdateBannedList = await FindBanListByIDAndUpdate(banListID as ObjectId, {status:statusForBanList});

            if(!UpdateBannedList)
            {
                return res.status(200).json({ success, error:"Failed to Banned List Status!"});
            }
        }

        if(deleteListID)
        {
            const foundDeleteList = await FindDeleteListByID(deleteListID);

            if(!foundDeleteList)
            {
                return res.status(200).json({ success, error:"Invalid Delete List ID!"});
            }

            const UpdateDeleteList = await FindDeleteListByIDAndUpdate(deleteListID as ObjectId, {status:statusForDeleteList});

            if(!UpdateDeleteList)
            {
                return res.status(200).json({ success, error:"Failed to Delete List Status!"});
            }
        }

        if(statusForUserList !== foundUser.status)
        {
            const userId = foundUser._id as ObjectId;
            const changeStatus = await ChangeUserListStatus(userId, statusForUserList, description, startDate, dueDate);

            if(!changeStatus)
            {
                return res.status(200).json({ success, error:"Failed to Change Status!"});
            }
        }

        success = true;
        res.json({ success, message:"Change Status Successfully!"});
    }
    catch (error) 
    {
        res.status(500).json({ success, error: "Internal Server Error!" });
    }
}

export const ModifyBanListData = async (req: AuthRequest, res:Response) => 
{
    const { banListID, dueDate, description } = req.body;
    const foundUser = req.foundUser as UserInterface;
    let success = false;

    try
    {
        if(foundUser.status !== "Banned")
        {
            return res.status(400).json({ success, error: "This user currently is not Banned!"});
        }

        const foundBanList = await FindBanListByID(banListID as ObjectId);

        if(!foundBanList)
        {
            return res.status(400).json({ success, error: "Could not found the record with Ban List!"});
        }

        const modifyBanList = await FindBanListByIDAndUpdate(banListID as ObjectId, {dueDate, description});

        if(!modifyBanList)
        {
            return res.status(400).json({ success, error: "Failed to update Ban List record!"});
        }

        success = true;
        res.json({ success, message: "Ban List Record Update Successfully!"});
    }
    catch(error)
    {
        res.status(500).json({ success, error: "Internal Server Error!" });
    }
}

export const DeleteUser = async (req: AuthRequest, res: Response) => 
{
    const foundUser = req.foundUser as UserInterface;
    const bodyData =  req.body as BodyInterfaceForDelete;
    const deleteListID = bodyData.banListId as unknown as ObjectId;
    let success = false;

    try 
    {
        const deleteUser = await FindUserByIDAndDelete(foundUser._id);

        if(!deleteUser)
        {
            return res.status(401).json({ success, error: "Failed to delete user!" });
        }

        const changeBannedListStatus = await FindBanListByIDAndUpdate(deleteListID as ObjectId, {status:bodyData.status})

        if(!changeBannedListStatus)
        {
            return res.status(401).json({ success, error: "Failed to change delete user status!"});
        }

        success = true;
        res.json({ success, message: "Delete user successfully!" });
    }
    catch(error)
    {
        res.status(500).json({ success, error: "Internal Server Error!" });
    }
}