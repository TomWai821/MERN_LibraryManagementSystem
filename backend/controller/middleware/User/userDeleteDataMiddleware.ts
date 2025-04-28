import { NextFunction, Response } from "express";
import { AuthRequest } from "../../../model/requestInterface";
import { FindSuspendListByIDAndDelete } from "../../../schema/user/suspendList";

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