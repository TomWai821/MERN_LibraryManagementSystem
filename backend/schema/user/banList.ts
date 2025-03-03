import mongoose, { ObjectId } from "mongoose";
import { BanListInterface } from "../../model/userSchemaInterface";
import { printError } from "../../controller/Utils";

const BanListSchema = new mongoose.Schema<BanListInterface>
(
    {
        _id: { type: String, required: true },
        userID: { type: String, ref:'User', required: true },
        description: { type: String, required: true },
        startDate: { type: Date, required: true, immutable: true },
        dueDate: { type: Date, required: true },
        createdAt: { type: Date, default: Date.now, immutable: true }
    }
)

const BanList = mongoose.model<BanListInterface>('BanList', BanListSchema);

export const CreateBanList = async (data: Record<string, any>) =>
{
    try 
    {
        const banList = await BanList.create(data);
        return banList;
    } 
    catch (error) 
    {
        printError(error);
    }
}

export const GetBanList = async (data?: Record<string, any>) =>
{
    try 
    {
        if (typeof data === "string") 
        {
            return await BanList.find({});
        }
        return await BanList.find(data as Record<string, any>);
    }  
    catch (error) 
    {
        printError(error);
    }
}

export const GetBanListCount = async (roleID?: string) => 
{
    if(roleID)
    {
        return await BanList.countDocuments({ where: { role: roleID }});
    }
    return await BanList.countDocuments();
}

export const FindBanList = async (data: Record<string, any>) =>
{
    try 
    {
        return await BanList.findOne(data);
    } 
    catch (error) 
    {
        printError(error);
    }
}

export const FindBanListByID = async (banListID: ObjectId, select?: Record<string, any>) =>
{
    try 
    {
        if (select) 
        {
            return await BanList.findById(banListID).select(select);
        }
        return await BanList.findById(banListID);
    } 
    catch (error) 
    {
        printError(error);
    }
}

export const FindBanListByIDAndUpdate = async (banListID: ObjectId, data: Record<string, any>) =>
{
    try 
    {
        return await BanList.findByIdAndUpdate(banListID, data, { new: true });
    } 
    catch (error) 
    {
        printError(error);
    }
}

export const FindBanListByIDAndDelete = async (banListID: ObjectId) =>
{
    try 
    {
        return await BanList.findByIdAndDelete(banListID);
    } 
    catch (error) 
    {
        printError(error);
    }
}