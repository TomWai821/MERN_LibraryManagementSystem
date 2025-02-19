import mongoose from 'mongoose';
import { UserInterface } from '../../model/userSchemaInterface';

const UserSchema = new mongoose.Schema<UserInterface>
(
    {
        username: { type: String, require: true },
        email: { type: String, require: true },
        password: { type: String, require: true },
        gender: { type: String, require: true },
        birthDay: { type: String, require: true },
        role: { type: String, require: true, default: 'User' },
        status: { type: String, require: true, default: 'Normal' },
        createdAt: { type: Date, default: Date.now }
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