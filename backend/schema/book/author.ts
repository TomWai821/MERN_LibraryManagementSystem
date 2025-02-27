import mongoose from 'mongoose';
import { AuthorInterface } from '../../model/bookSchemaInterface';

const AuthorSchema = new mongoose.Schema<AuthorInterface>
(
    {
        _id: { type: String, required: true },
        author: { type: String, required: true },
        phoneNumber: { type:String, required: true },
        email: { type:String, required: true },
        createdAt: { type: Date, default: Date.now, immutable: true }
    }
)

const Author = mongoose.model<AuthorInterface>('Author', AuthorSchema);

export const CreateAuthor = async (data:Record<string, any>) =>
{
    try
    {
        const author = await Author.create(data);
        return author;
    }
    catch(error)
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

export const GetAuthor = async (data?:Record<string, any>) =>
{
    try
    {
        if(!data)
        {
            return await Author.find({});
        }
        return await Author.find(data);
    }
    catch(error)
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

};
        
export const FindAuthor = async (data: Record<string, any>) =>
{
    try
    {
        return await Author.findOne(data);
    }
    catch(error)
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

export const FindAuthorByID = async (author: string, select?: Record<string, any>) =>
{
    try
    {
        if(select)
        {
            return await Author.findById(author).select(select);
        }
        return await Author.findById(author);
    }
    catch(error)
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

export const FindAuthorByIDAndUpdate = async (author: string, data: Record<string, any>) =>
{
    try
    {
        return await Author.findByIdAndUpdate(author, data);
    }
    catch(error)
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

export const FindAuthorByIDAndDelete = async (author: string, data: Record<string, any>) =>
{
    try
    {
        return await Author.findByIdAndDelete(author, data);
    }
    catch(error)
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
