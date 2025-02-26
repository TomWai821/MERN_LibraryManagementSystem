import mongoose from 'mongoose';
import { UserInterface } from '../../model/userSchemaInterface';

const UserSchema = new mongoose.Schema<UserInterface>
(
    {
        _id: {type: String, required: true},
        username: { type: String, required: true },
        email: { type: String, required: true },
        password: { type: String, required: true },
        genderID: { type: mongoose.Schema.Types.ObjectId, ref:'Gender',  required: true },
        roleID: { type: mongoose.Schema.Types.ObjectId, ref:'Role', required: true, default: 'User' },
        statusID: { type: mongoose.Schema.Types.ObjectId, ref:'Status', required: true, default: 'Normal' },
        birthDay: { type: String, required: true },
        createdAt: { type: Date, default: Date.now, immutable: true }
    }
);

const User = mongoose.model<UserInterface>('User', UserSchema);

class UserService 
 {
    async CreateUser(data: Record<string, any>) 
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
  
    async GetUser(data?: Record<string, any>) 
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
  
    async FindUser(data: Record<string, any>) 
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

    async FindUserWithData(data: Record<string, any>)
    {
        try
        {
            return await User.find(data);
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
  
    async FindUserByID(userID: string, select?: Record<string, any>) 
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
  
    async FindUserByIDAndUpdate(userID: string, data: Record<string, any>) 
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
  
    async FindUserByIDAndDelete(userID: string) 
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
}
  
export default new UserService();