import mongoose, { ObjectId } from "mongoose";
import { SuspendListInterface } from "../../model/userSchemaInterface";
import { printError } from "../../controller/Utils";
import { FindUserByIDAndUpdate } from "./user";

const SuspendListSchema = new mongoose.Schema<SuspendListInterface>
(
    {
        userID: { type: mongoose.Types.ObjectId, ref: 'User', required: true },
        description: { type: String, default: "N/A" },
        startDate: { type: Date, required: true, immutable: true },
        dueDate: { type: Date }
    }
)

const SuspendList = mongoose.model<SuspendListInterface>('SuspendList', SuspendListSchema);

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

export const detectExpiredSuspendRecord = async () => 
{
    try
    {
        const currentDate = new Date();

        const expiresRecord = await GetSuspendList({dueDate: {$lte: currentDate}}) as SuspendListInterface[];

        if(expiresRecord.length > 0)
        {
            console.log(`Auto-Unsuspend ${expiresRecord.length} users`);

            for(const user of expiresRecord)
            {
                const deleteSuspendRecord = await SuspendList.findByIdAndDelete(user.userID);
            
                if(!deleteSuspendRecord)
                {
                    return console.log(`Failed to Unsuspend ${user.userID}`);
                }

                const modifyUserStatus = await FindUserByIDAndUpdate(user.userID, {status: 'Normal'});

                if(!modifyUserStatus)
                {
                    return console.log(`Failed to Change ${user.userID} status`);
                }

                console.log(`Unsuspend user ${user.userID} successfully!`);
            }
        }
    }
    catch(error)
    {
        console.error("Error detecting expired suspensions:", error);
    }
}

const DayToMillionSeconds = 24 * 60 * 60 * 1000;
setInterval(detectExpiredSuspendRecord, DayToMillionSeconds);