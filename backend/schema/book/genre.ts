import mongoose from 'mongoose';
import { GenreInterface } from '../../model/bookSchemaInterface';
import { printError } from '../../controller/Utils';

const GenreSchema = new mongoose.Schema<GenreInterface>
(
    {
        _id: { type: String, required: true },
        genre: { type: String, required: true },
        createdAt: { type: Date, default: Date.now, immutable: true }
    }
)

const Genre = mongoose.model<GenreInterface>('Genre', GenreSchema);

export const CreateGenre = async (data:Record<string, any>) =>
{
    try
    {
        return await Genre.create(data);
    }
    catch(error)
    {
        printError(error);
    }
}

export const GetGenre = async (data?:Record<string, any>) =>
{
    try
    {
        if(!data)
        {
            return await Genre.find({});
        }
        return await Genre.find(data);
    }
    catch(error)
    {
        printError(error);
    }

};
        
export const FindGenre = async (data: Record<string, any>) =>
{
    try
    {
        return await Genre.findOne(data);
    }
    catch(error)
    {
        printError(error);
    }
}

export const FindGenreByID = async (genre: string, select?: Record<string, any>) =>
{
    try
    {
        if(select)
        {
            return await Genre.findById(genre).select(select);
        }
        return await Genre.findById(genre);
    }
    catch(error)
    {
        printError(error);
    }
}

export const FindGenreByIDAndUpdate  = async (genre: string, data: Record<string, any>) =>
{
    try
    {
        return await Genre.findByIdAndUpdate(genre, data);
    }
    catch(error)
    {
        printError(error);
    }
}

export const FindGenreByIDAndDelete = async (genre: string, data: Record<string, any>) =>
{
    try
    {
        return await Genre.findByIdAndDelete(genre, data);
    }
    catch(error)
    {
        printError(error);
    }
}