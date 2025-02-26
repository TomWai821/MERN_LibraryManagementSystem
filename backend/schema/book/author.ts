import mongoose from 'mongoose';
import { AuthorInterface } from '../../model/bookSchemaInterface';

const AuthorSchema = new mongoose.Schema<AuthorInterface>
(
    {
        _id: { type: String, required: true },
        author: { type: String, required: true },
        phoneNumber: { type:String, required: true },
        email: { type:String, required: true }
    }
)

const Author = mongoose.model<AuthorInterface>('Author', AuthorSchema);

class AuthorService
{
    async CreateAuthor(data:Record<string, any>)
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

    async GetAuthor (data?:Record<string, any>)
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
        
    async FindAuthor (data: Record<string, any>)
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

    async FindAuthorByID (author: string, select?: Record<string, any>)
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

    async FindAuthorByIDAndUpdate (author: string, data: Record<string, any>)
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

    async FindAuthorByIDAndDelete (author: string, data: Record<string, any>)
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
}

export default new AuthorService();