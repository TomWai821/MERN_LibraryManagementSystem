import { Request, Response } from 'express';
import { AuthRequest, CreateUserInterface } from '../model/requestInterface';
import { jwtSign, bcryptHash } from './hashing'
import { UserInterface } from '../model/userSchemaInterface';
import { CreateUser, FindUserByIDAndDelete, FindUserByIDAndUpdate } from '../schema/user/user';

import { ObjectId } from 'mongoose';
import { CreateStatusList } from './middleware/User/userUpdateDataMiddleware';
import { FindDeleteListByIDAndDelete } from '../schema/user/deleteList';
import { FindSuspendListByIDAndUpdate } from '../schema/user/suspendList';

import QRCode from 'qrcode';

export const UserRegister = async(req: Request, res: Response) =>
{
    const { email, username, password, gender, birthDay, role, status, avatarUrl }: CreateUserInterface = req.body;
    let success = false;

    try
    {   
        // Hash password with bcrypt after validate email and username
        const hashedPassword = await bcryptHash(password); 
        const mongoDate = new Date(birthDay);
    
        // Create a new user after hashing the password
        const newUser = await CreateUser({ email, username, password: hashedPassword, gender, role, status, birthDay: mongoDate, avatarUrl});

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

export const GetUserData = async (req: AuthRequest, res: Response) =>
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

export const ChangeUserData = async (req: AuthRequest, res: Response) => 
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
    const { statusForUserList, description, startDate, dueDate } = req.body;
    console.log(req.body)
    const foundUser = req.foundUser as UserInterface;
    const userId = foundUser._id as ObjectId;
    let success = false;

    try
    {
        if(statusForUserList !== "Normal" && foundUser.status === "Normal")
        {
            const createStatusData = await CreateStatusList(statusForUserList, userId as ObjectId, description, startDate, dueDate);

            if(!createStatusData)
            {
                return res.status(400).json({success, message:"Fail to Create Record in Delete List/Suspend List"});
            }
        }

        const changeStatusInUsertable = await FindUserByIDAndUpdate(userId, {status: statusForUserList});

        if(!changeStatusInUsertable)
        {
            return res.status(400).json({success, message:"Failed to update status in User Table"});
        }

        success = true;
        res.json({ success, message:"Change Status Successfully!"});
    }
    catch (error) 
    {
        console.log(error);
        res.status(500).json({ success, error: "Internal Server Error!" });
    }
}

export const ModifySuspendListData = async (req: AuthRequest, res:Response) => 
{
    const { banListID, dueDate, description } = req.body;
    let success = false;

    try
    {
        const modifySuspendList = await FindSuspendListByIDAndUpdate(banListID as ObjectId, {dueDate, description});

        if(!modifySuspendList)
        {
            return res.status(400).json({ success, error: "Failed to update Suspend List record!"});
        }

        success = true;
        res.json({ success, message: "Suspend List Record Update Successfully!"});
    }
    catch(error)
    {
        res.status(500).json({ success, error: "Internal Server Error!" });
    }
}

export const DeleteUser = async (req: AuthRequest, res: Response) => 
{
    const foundUser = req.foundUser as UserInterface;
    let success = false;

    try 
    {
        const removeRecordFromDeleteList = await FindDeleteListByIDAndDelete(req.body.deleteListID);

        if(!removeRecordFromDeleteList)
        {
            return res.status(401).json({ success, error: "Failed to Delete user in delete List!"});
        }

        const deleteUser = await FindUserByIDAndDelete(foundUser._id);

        if(!deleteUser)
        {
            return res.status(401).json({ success, error: "Failed to delete user!" });
        }

        success = true;
        res.json({ success, message: "Delete user successfully!" });
    }
    catch(error)
    {
        res.status(500).json({ success, error: "Internal Server Error!" });
    }
}