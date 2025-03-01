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

export const FindUserWithData = async (tableName:string, data: Record<string, any>, page: string, amount: string, userId: string) =>
{
    try
    {
        const pageAsNumber = parseInt(page);
        const amountAsNumber = parseInt(amount);
        const pipeline: Record<string,any>[] = [];

        data._id = { $ne: userId };
        
        switch(tableName)
        {
            case "BannedUser":
                return await User.find(data).limit(pageAsNumber).skip(amountAsNumber);

            case "DeleteUser":
                return await User.find(data).limit(pageAsNumber).skip(amountAsNumber);

            case "AllUser":
                return await User.find(data).limit(pageAsNumber).skip(amountAsNumber);
            
            default:
                return await User.find(data);
        }
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

export const FindUserByIDAndUpdate = async (userID: ObjectId, data: Record<string, any>) =>
{
    try 
    {
        return await User.findByIdAndUpdate(userID, data, { new: true });
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

export const FindUserByIDAndDelete = async (userID: string) =>
{
    try 
    {
        return await User.findByIdAndDelete(userID);
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