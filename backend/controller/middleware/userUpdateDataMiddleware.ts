import { NextFunction, Response } from "express";
import { AuthRequest } from "../../model/requestInterface";
import { FindUser } from "../../schema/user/user";
import { ObjectId } from "mongoose";
import { CreateBanList, FindBanList, FindBanListByIDAndDelete } from "../../schema/user/banList";
import { CreateDeleteList, FindDeleteList } from "../../schema/user/deleteList";
import { UserInterface } from "../../model/userSchemaInterface";

// For user update(Require login)
export const BuildUpdateData = async (req: AuthRequest, res:Response, next:NextFunction) => 
{
    const { username, email, gender, role, status, description, startDate, dueDate} = req.body;
    const foundUser = req.foundUser as UserInterface;

    const updateData: Record<string, any> = {};

    if (username && username !== foundUser.username) 
    {
        const existingUserByUsername = await FindUser({ username });
        
        if (existingUserByUsername) 
        {
            return res.status(400).json({ success: false, error: "Username already in use" });
        }
        updateData.username = username;
    }
    
    if (email && email !== foundUser.email) 
    {
        const existingUserByEmail = await FindUser({ email });

        if (existingUserByEmail) 
        {
            return res.status(400).json({ success: false, error: "Email already in use" });
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

    if(status !== foundUser.status)
    {
        const changeStatus = await ChangeStatus(foundUser._id, status, description, startDate, dueDate);     

        if(!changeStatus)
        {
            return res.status(200).json({ sucess: false, error:"Failed to Change Status!"});
        }
        updateData.status = status;
    }

    if (Object.keys(updateData).length === 0) 
    {
        return res.status(400).json({ success: false, error: "No changes detected" });
    }

    req.updateData = updateData;
    next();
}

const ChangeStatus = async (userId:ObjectId, status:string, description: string, startDate: Date, dueDate: Date) => 
{
    switch(status)
    {
        case "Banned":
            const findUserInBanList = await FindBanList({userId: userId as ObjectId});

            if(findUserInBanList)
            {
                return false;
            }
            return await HandleBanStatus(userId, description, startDate, dueDate);

        case "Delete":
            const findUserInDeleteList = await FindDeleteList({userId: userId as ObjectId});

            if(findUserInDeleteList)
            {
                return false;
            }
           return await HandleDeleteStatus(userId, startDate, dueDate);

        case "Normal":
            return true;
            
        default:
            return new Error(`Invalid status: ${status}`);
    }
}

const HandleBanStatus = async (userId:ObjectId, description: string, startDate: Date, dueDate: Date) => 
{
    const createBanList = await CreateBanList({userID: userId, description, startDate, dueDate});
    return createBanList;
}

const HandleDeleteStatus = async (userId:ObjectId, startDate: Date, dueDate: Date) => 
{
    const createDeleteList = await CreateDeleteList({userID: userId, startDate, dueDate});
    return createDeleteList;
}