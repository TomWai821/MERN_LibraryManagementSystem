import mongoose, { ObjectId } from "mongoose";
import { DeleteAndSuspendListInterface } from "../../model/userSchemaInterface";
import { printError } from "../../controller/Utils";

const SuspendListSchema = new mongoose.Schema<DeleteAndSuspendListInterface>
(
    {
        userID: { type: mongoose.Types.ObjectId, ref: 'User', required: true },
        description: { type: String, required: true },
        startDate: { type: Date, required: true, immutable: true },
        dueDate: { type: Date }
    }
)

const SuspendList = mongoose.model<DeleteAndSuspendListInterface>('SuspendList', SuspendListSchema);

export const CreateSuspendList = async (data: Record<string, any>) =>
{
    try 
    {
        const banList = await SuspendList.create(data);
        return banList;
    } 
    catch (error) 
    {
        printError(error);
    }
}

export const GetSuspendList = async (data?: Record<string, any>) =>
{
    try 
    {
        if (typeof data === "string") 
        {
            return await SuspendList.find({});
        }
        return await SuspendList.find(data as Record<string, any>);
    }  
    catch (error) 
    {
        printError(error);
    }
}

export const GetSuspendListCount = async (roleID?: string) => 
{
    if(roleID)
    {
        return await SuspendList.countDocuments({ where: { role: roleID }});
    }
    return await SuspendList.countDocuments();
}

export const FindSuspendList = async (data: Record<string, any>) =>
{
    try 
    {
        return await SuspendList.findOne(data);
    } 
    catch (error) 
    {
        printError(error);
    }
}

export const FindSuspendListByID = async (banListID: ObjectId, select?: Record<string, any>) =>
{
    try 
    {
        if (select) 
        {
            return await SuspendList.findById(banListID).select(select);
        }
        return await SuspendList.findById(banListID);
    } 
    catch (error) 
    {
        printError(error);
    }
}

export const FindSuspendListByIDAndUpdate = async (banListID: ObjectId, data: Record<string, any>) =>
{
    try 
    {
        return await SuspendList.findByIdAndUpdate(banListID, data, { new: true });
    } 
    catch (error) 
    {
        printError(error);
    }
}

export const FindSuspendListByIDAndDelete = async (banListID: ObjectId) =>
{
    try 
    {
        return await SuspendList.findByIdAndDelete(banListID);
    } 
    catch (error) 
    {
        printError(error);
    }
}