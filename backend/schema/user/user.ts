import mongoose, { ObjectId, PipelineStage } from 'mongoose';
import { UserInterface } from '../../model/userSchemaInterface';
import { printError } from '../../controller/Utils';
import { userRole, userStatus } from '../../Arrays/TypeArrayForUser';


const UserSchema = new mongoose.Schema<UserInterface>
(
    {
        username: { type: String, required: true },
        email: { type: String, required: true },
        password: { type: String, required: true },
        gender: { type: String, required: true },
        role: { type: String, required: true, default: 'User', enum: userRole },
        status: { type: String, required: true, default: 'Normal', enum: userStatus },
        birthDay: { type: String, required: true },
        avatarUrl: { type:String, required: true },
        createdAt: { type: Date, default: Date.now, immutable: true }
    }
);

const User = mongoose.model<UserInterface>('User', UserSchema);

export const CreateUser = async (data: Record<string, any>) =>
{
    try 
    {
        const user = await User.create(data);
        return user;
    } 
    catch (error) 
    {
        printError(error);
    }
}

export const GetUser = async (data?: Record<string, any>) =>
{
    try 
    {
        if (typeof data == "string") 
        {
            return await User.find({});
        }
        return await User.find(data as Record<string, any>);
    }  
    catch (error) 
    {
        printError(error);
    }
}

export const GetUserCount = async (roleID?: string) => 
{
    if(roleID)
    {
        return await User.countDocuments({where: { role: roleID }});
    }
    return await User.countDocuments();
}

export const FindUser = async (data: Record<string, any>) =>
{
    try 
    {
        return await User.findOne(data);
    } 
    catch (error) 
    {
        printError(error);
    }
}

export const FindUserWithData = async (tableName:string, data: Record<string, any>, userId?: ObjectId) =>
{
    try
    {
        data._id = { $ne: userId };
        
        switch(tableName)
        {
            case "BannedUser":
                return await GetUsersWithBannedDetails(data);

            case "DeleteUser":
                return await GetUsersWithDeleteDetails(data);

            case "AllUser":
                return await User.find(data).select("-password");
            
            default:
                return await User.findOne(data).select("-password");
        }
    }
    catch (error) 
    {
        printError(error);
    }
}

// Local variable(For get banned user data)
const GetUsersWithBannedDetails = async (data: any) => 
{
    let pipeline:PipelineStage[] = [];

    if (data) 
    {
        pipeline.push({ $match: data });
    }

    pipeline.push
    (
        {
            $lookup: {
                from: 'banlists',
                localField: '_id',
                foreignField: 'userID',
                as: 'bannedDetails'
            }
        },
        { $unwind: '$bannedDetails' },
        { $project: { 'bannedDetails.password': 0 } }
    );

    return await User.aggregate(pipeline);
}

// Local variable(For get delete user data)
const GetUsersWithDeleteDetails = async (data: any) => 
{
    return await User.aggregate(
        [
            { $match: data }, 
            {
                $lookup: {
                    from: 'deletelists',  // the table name user want to joins
                    localField: '_id',  // the local column name user want to compare with join table column
                    foreignField: 'userID',  // the another table column name user want to compare with local column name
                    as: 'deleteDetails'  
                }
            },
            { $unwind: '$deleteDetails' },
            { $project: { 'deleteDetails.password': 0  }}
        ]
    );
}

export const FindUserByID = async (userID: ObjectId, select?: Record<string, any>) =>
{
    try 
    {
        if (select) 
        {
            return await User.findById(userID).select(select);
        }
        return await User.findById(userID).select("-password");
    } 
    catch (error) 
    {
        printError(error);
    }
}

export const FindUserByIDAndUpdate = async (userID: ObjectId, data: Record<string, any>) =>
{
    try 
    {
        return await User.findByIdAndUpdate(userID, data, { new: true });
    } 
    catch (error) 
    {
        printError(error);
    }
}

export const FindUserByIDAndDelete = async (userID: ObjectId) =>
{
    try 
    {
        return await User.findByIdAndDelete(userID);
    } 
    catch (error) 
    {
        printError(error);
    }
}