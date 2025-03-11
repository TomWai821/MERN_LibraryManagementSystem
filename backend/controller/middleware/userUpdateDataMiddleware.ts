import { NextFunction, Response } from "express";
import { AuthRequest } from "../../model/requestInterface";
import { FindUser } from "../../schema/user/user";
import { ObjectId } from "mongoose";
import { CreateBanList, FindBanList, FindBanListByID, FindBanListByIDAndDelete, FindBanListByIDAndUpdate } from "../../schema/user/banList";
import { CreateDeleteList, FindDeleteList, FindDeleteListByID, FindDeleteListByIDAndDelete } from "../../schema/user/deleteList";
import { UserInterface } from "../../model/userSchemaInterface";

// For user update(Require login)
export const BuildUpdateData = async (req: AuthRequest, res:Response, next:NextFunction) => 
{
    const { username, email, gender, role } = req.body;
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

    if (Object.keys(updateData).length === 0) 
    {
        return res.status(400).json({ success: false, error: "No changes detected" });
    }

    req.updateData = updateData;
    next();
}

export const DeleteBanListOrDeleteListData = async (req: AuthRequest, res: Response, next:NextFunction) => 
{
    const {deleteListID, banListID, statusForUserList} = req.body;

    if(statusForUserList === "Normal")
    {
        if(deleteListID)
        {
            const deleteDataFromDeleteList = await FindDeleteListByIDAndDelete(deleteListID);

            if(!deleteDataFromDeleteList)
            {
                return res.status(400).json({ success: false, error:"Failed to Remove Delete List Data!"});
            }
        }
        
        if(banListID)
        {
            const deleteDataFromBanList = await FindBanListByIDAndDelete(banListID);

            if(!deleteDataFromBanList)
            {
                return res.status(400).json({ success: false, error:"Invalid Delete Ban List Data!"});
            }
        } 
    }

    next();
}

export const CreateStatusList = async (statusForUserList:string, userId:ObjectId, description: string, startDate: Date, dueDate: Date) => 
{
    const ListHandlers:Record<string, { find: () => Promise<any>; create: () => Promise<any>; }> = 
    {
        "Banned":
        {
            find: () => FindBanList({ userId }), create: () => CreateBanList({ userID: userId, description, startDate, dueDate }) 
        },
        "Delete":
        {
            find: () => FindDeleteList({userId}),  create: () => CreateDeleteList({ userID: userId, description, startDate, dueDate })
        }
    }

    const { find, create } = ListHandlers[statusForUserList];

    if (!ListHandlers[statusForUserList]) 
    {
        console.log(`Invalid status: ${statusForUserList}`);
    }

    const existingList = await find();

    if (!existingList) 
    {
        try
        {
            return await create();
        } 
        catch (error) 
        {
            throw new Error("Failed to create list");
        }
    }

    return false;
}