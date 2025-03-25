import mongoose from "mongoose";
import { BookFavouriteInterface } from "../../model/bookSchemaInterface";
import { printError } from "../../controller/Utils";

const BookFavouriteSchema = new mongoose.Schema<BookFavouriteInterface>
(   
    {
        userID: { type: String, required: true },
        bookID: { type: String, required: true }
    }
)

const BookFavourite = mongoose.model<BookFavouriteInterface>('BookFavourite', BookFavouriteSchema);

export const CreateBookFavourite = async (data:Record<string, any>) =>
{
    try
    {
        return await BookFavourite.create(data);
    }
    catch(error)
    {
        printError(error);
    }
}

export const GetBookFavourite = async (data?:Record<string, any>) =>
{
    try
    {
        if(!data)
        {
            return await BookFavourite.find({});
        }
        return await BookFavourite.find(data);
    }
    catch(error)
    {
        printError(error);
    }

};
        
export const FindBookFavourite = async (data: Record<string, any>) =>
{
    try
    {
        return await BookFavourite.findOne(data);
    }
    catch(error)
    {
        printError(error);
    }
}

export const FindBookFavouriteByID = async (bookFavouriteId: string, select?: Record<string, any>) =>
{
    try
    {
        if(select)
        {
            return await BookFavourite.findById(bookFavouriteId).select(select);
        }
        return await BookFavourite.findById(bookFavouriteId);
    }
    catch(error)
    {
        printError(error);
    }
}

export const FindBookFavouriteByIDAndUpdate  = async (bookFavouriteId: string, data: Record<string, any>) =>
{
    try
    {
        return await BookFavourite.findByIdAndUpdate(bookFavouriteId, data);
    }
    catch(error)
    {
        printError(error);
    }
}

export const FindBookFavouriteByIDAndDelete = async (bookFavouriteId: string, data: Record<string, any>) =>
{
    try
    {
        return await BookFavourite.findByIdAndDelete(bookFavouriteId, data);
    }
    catch(error)
    {
        printError(error);
    }
}