import mongoose, { ObjectId } from 'mongoose';
import { UserInterface } from '../../model/userSchemaInterface';

const UserSchema = new mongoose.Schema<UserInterface>
(
    {
        _id: {type: String, required: true},
        username: { type: String, required: true },
        email: { type: String, required: true },
        password: { type: String, required: true },
        gender: { type: String, required: true },
        role: { type: String, required: true, default: 'User' },
        status: { type: String, required: true, default: 'Normal' },
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

export const FindUserWithData = async (tableName:string, data: Record<string, any>, page: number, amount: number, userId: string) =>
{
    try
    {
        // for skip document => 0 = skip 0 document, and page = select from which amount (e.g. skipItem = 0, amount = 10, then will get 0 - 10 items)
        const skipItems = page * amount;

        data._id = { $ne: userId };
        
        switch(tableName)
        {
            case "BannedUser":
                return await GetUsersWithBannedDetails(data, amount, skipItems);

            case "DeleteUser":
                return await GetUsersWithDeleteDetails(data, amount, skipItems);

            case "AllUser":
                return await User.find(data).limit(amount).skip(skipItems);
            
            default:
                return await User.findOne(data);
        }
    }
    catch (error) 
    {
        printError(error);
    }
}

const GetUsersWithBannedDetails = async (data: any, itemAmountPerPage: number, skipItems: number) => 
{
    return await User.aggregate(
        [
            { $match: data }, 
            {
                $lookup: {
                    from: 'banlists',  // the table name does user want to joins
                    localField: '_id',  // the local column name does want to compare with joins table column
                    foreignField: 'userID',  // the another table column name does user want to compare with local column name
                    as: 'bannedDetails'  
                }
            },
            { $unwind: '$bannedDetails' },  
            { $skip: skipItems },  
            { $limit: itemAmountPerPage }  
        ]
    );
}

const GetUsersWithDeleteDetails = async (data: any, itemAmountPerPage: number, skipItems: number) => 
{
    return await User.aggregate(
        [
            { $match: data }, 
            {
                $lookup: {
                    from: 'deletelists',  // the table name does user want to joins
                    localField: '_id',  // the local column name does want to compare with joins table column
                    foreignField: 'userID',  // the another table column name does user want to compare with local column name
                    as: 'deleteDetails'  
                }
            },
            { $unwind: '$deleteDetails' },  
            { $skip: skipItems },  
            { $limit: itemAmountPerPage }  
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
        return await User.findById(userID);
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

export const printError = async (error:any) => 
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