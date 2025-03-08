import mongoose from "mongoose";
import { BookReturnInterface } from "../../model/bookSchemaInterface";
import { printError } from "../../controller/Utils";

const BookReturnSchema = new mongoose.Schema<BookReturnInterface>
(   
    {
        issueID: { type: mongoose.Types.ObjectId, required: true },
        returnDate: { type: Date, required: true },
        createdAt: { type: Date, default: Date.now, immutable: true }
    }
)

const BookReturn = mongoose.model<BookReturnInterface>('BookReturn', BookReturnSchema);

export const CreateBookReturn = async (data:Record<string, any>) =>
{
    try
    {
        return await BookReturn.create(data);
    }
    catch(error)
    {
        printError(error);
    }
}

export const GetBookReturn = async (data?:Record<string, any>) =>
{
    try
    {
        if(!data)
        {
            return await BookReturn.find({});
        }
        return await BookReturn.find(data);
    }
    catch(error)
    {
        printError(error);
    }

};
        
export const FindBookReturn = async (data: Record<string, any>) =>
{
    try
    {
        return await BookReturn.findOne(data);
    }
    catch(error)
    {
        printError(error);
    }
}

export const FindBookReturnByID = async (bookReturnId: string, select?: Record<string, any>) =>
{
    try
    {
        if(select)
        {
            return await BookReturn.findById(bookReturnId).select(select);
        }
        return await BookReturn.findById(bookReturnId);
    }
    catch(error)
    {
        printError(error);
    }
}

export const FindBookReturnByIDAndUpdate  = async (bookReturnId: string, data: Record<string, any>) =>
{
    try
    {
        return await BookReturn.findByIdAndUpdate(bookReturnId, data);
    }
    catch(error)
    {
        printError(error);
    }
}

export const FindBookReturnByIDAndDelete = async (bookReturnId: string, data: Record<string, any>) =>
{
    try
    {
        return await BookReturn.findByIdAndDelete(bookReturnId, data);
    }
    catch(error)
    {
        printError(error);
    }
}