import { NextFunction, Response } from "express";
import { AuthRequest } from "../../model/requestInterface";
import { FindUser } from "../../schema/user/user";
import { ObjectId } from "mongoose";
import { CreateBanList, GetBanListCount } from "../../schema/user/banList";
import { CreateDeleteList, GetDeleteListCount } from "../../schema/user/deleteList";
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
    }

    if (Object.keys(updateData).length === 0 && !status) 
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
            return await HandleBanStatus(userId, description, startDate, dueDate);

        case "Delete":
           return await HandleDeleteStatus(userId, startDate, dueDate);

        case "Normal":
            return true;

        default:
            return new Error(`Invalid status: ${status}`);
    }
}

const HandleBanStatus = async (userId:ObjectId, description: string, startDate: Date, dueDate: Date) => 
{
    const banListCount = await GetBanListCount() + 1;
    const customBanListID = `BanList-${banListCount}`;
    const createBanList = await CreateBanList({_id:customBanListID, userID: userId, description, startDate, dueDate});
    return createBanList;
}

const HandleDeleteStatus = async (userId:ObjectId, startDate: Date, dueDate: Date) => 
{
    const deleteListCount = await GetDeleteListCount() + 1;
    const customDeleteListID = `DeleteList-${deleteListCount}`;
    const createDeleteList = await CreateDeleteList({_id:customDeleteListID, userID: userId, startDate, dueDate});
    return createDeleteList;
}