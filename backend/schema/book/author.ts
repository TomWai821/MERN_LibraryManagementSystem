import mongoose from 'mongoose';
import { AuthorInterface } from '../../model/bookSchemaInterface';
import { printError } from '../../controller/Utils';

const AuthorSchema = new mongoose.Schema<AuthorInterface>
(
    {
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
        return await Author.create(data);
    }
    catch(error)
    {
        printError(error);
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
        printError(error);
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
        printError(error);
    }
}

export const FindAuthorByID = async (authorId: string, select?: Record<string, any>) =>
{
    try
    {
        if(select)
        {
            return await Author.findById(authorId).select(select);
        }
        return await Author.findById(authorId);
    }
    catch(error)
    {
        printError(error);
    }
}

export const FindAuthorByIDAndUpdate = async (authorId: string, data: Record<string, any>) =>
{
    try
    {
        return await Author.findByIdAndUpdate(authorId, data);
    }
    catch(error)
    {
        printError(error);
    }
}

export const FindAuthorByIDAndDelete = async (authorId: string, data: Record<string, any>) =>
{
    try
    {
        return await Author.findByIdAndDelete(authorId, data);
    }
    catch(error)
    {
        printError(error);
    }
}
