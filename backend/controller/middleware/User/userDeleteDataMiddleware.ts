import { NextFunction, Response } from "express";
import { AuthRequest } from "../../../model/requestInterface";
import { FindBanListByIDAndDelete } from "../../../schema/user/banList";
import { FindDeleteListByIDAndDelete } from "../../../schema/user/deleteList";

export const DeleteBanListRecord = async (req:AuthRequest, res:Response, next:NextFunction) => 
{
    const {banListID, statusForUserList} = req.body;

    if(banListID && statusForUserList === "Normal")
    {
        const deleteBanListRecord = await FindBanListByIDAndDelete(banListID);

        if(!deleteBanListRecord)
        {
            return res.status(400).json({success: false, message: "Failed to delete Ban List Record"});
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