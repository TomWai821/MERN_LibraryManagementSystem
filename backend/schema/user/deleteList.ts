import mongoose, { ObjectId } from "mongoose";
import { DeleteListInterface } from "../../model/userSchemaInterface";

const DeleteListSchema = new mongoose.Schema<DeleteListInterface>
(
    {
        _id: { type: String, required: true },
        userID: { type: mongoose.Schema.Types.ObjectId, ref:'User', required: true },
        startDate: { type: Date, required: true },
        dueDate: { type: Date, required: true },
        createdAt: { type: Date, default: Date.now, immutable: true }
    }
)

const DeleteList = mongoose.model<DeleteListInterface>('DeleteList', DeleteListSchema);

export const CreateDeleteList = async (data: Record<string, any>) =>
{
    try 
    {
        const banList = await DeleteList.create(data);
        return banList;
    } 
    catch (error) 
    {
        if (error instanceof Error) 
        {
            throw new Error(error.message);
        } 
        else 
        {
            throw new Error('An unknown error occurred');
        }
    }
}

export const GetDeleteList = async (data?: Record<string, any>) =>
{
    try 
    {
        if (typeof data === "string") 
        {
            return await DeleteList.find({});
        }
        return await DeleteList.find(data as Record<string, any>);
    }  
    catch (error) 
    {
        if (error instanceof Error) 
        {
            throw new Error(error.message);
        } 
        else 
        {
            throw new Error('An unknown error occurred');
        }
    }
}

export const GetDeleteListCount = async (roleID?: string) => 
{
    if(roleID)
    {
        return await DeleteList.countDocuments({ where: { role: roleID }});
    }
    return await DeleteList.countDocuments();
}

export const FindDeleteList = async (data: Record<string, any>) =>
{
    try 
    {
        return await DeleteList.findOne(data);
    } 
    catch (error) 
    {
        if (error instanceof Error) 
        {
            throw new Error(error.message);
        } 
        else 
        {
            throw new Error('An unknown error occurred');
        }
    }
}

export const FindDeleteListByID = async (deleteListID: ObjectId, select?: Record<string, any>) =>
{
    try 
    {
        if (select) 
        {
            return await DeleteList.findById(deleteListID).select(select);
        }
        return await DeleteList.findById(deleteListID);
    } 
    catch (error) 
    {
        if (error instanceof Error) 
        {
            throw new Error(error.message);
        } 
        else 
        {
            throw new Error('An unknown error occurred');
        }
    }
}

export const FindDeleteListByIDAndUpdate = async (deleteListID: ObjectId, data: Record<string, any>) =>
{
    try 
    {
        return await DeleteList.findByIdAndUpdate(deleteListID, data, { new: true });
    } 
    catch (error) 
    {
        if (error instanceof Error) 
        {
            throw new Error(error.message);
        } 
        else 
        {
            throw new Error('An unknown error occurred');
        }
    }
}

export const FindDeleteListByIDAndDelete = async (deleteListID: ObjectId) =>
{
    try 
    {
        return await DeleteList.findByIdAndDelete(deleteListID);
    } 
    catch (error) 
    {
        if (error instanceof Error) 
        {
            throw new Error(error.message);
        } 
        else 
        {
            throw new Error('An unknown error occurred');
        }
    }
}