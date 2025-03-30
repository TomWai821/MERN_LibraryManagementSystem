import { NextFunction, Response } from "express";
import { AuthRequest } from "../../../model/requestInterface";
import { FindSuspendListByIDAndDelete } from "../../../schema/user/suspendList";
import { FindDeleteListByIDAndDelete } from "../../../schema/user/deleteList";

export const DeleteSuspendListRecord = async (req:AuthRequest, res:Response, next:NextFunction) => 
{
    const {banListID, statusForUserList} = req.body;

    if(banListID && statusForUserList === "Normal")
    {
        const deleteSuspendListRecord = await FindSuspendListByIDAndDelete(banListID);

        if(!deleteSuspendListRecord)
        {
            return res.status(400).json({success: false, message: "Failed to delete Suspend List Record"});
        }
    }
}

export const RemoveDeleteListRecord = async (req:AuthRequest, res:Response, next:NextFunction) => 
{
    const {deleteListID, statusForUserList} = req.body;

    if(deleteListID && statusForUserList === "Normal")
    {
        const removeDeleteListRecord = await FindDeleteListByIDAndDelete(deleteListID);

        if(!removeDeleteListRecord)
        {
            return res.status(400).json({success: false, message: "Failed to remove Delete List Record"});
        }
    }
    next();
}