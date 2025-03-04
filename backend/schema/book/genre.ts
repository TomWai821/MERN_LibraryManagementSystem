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

export const FindGenreByID = async (genreId: string, select?: Record<string, any>) =>
{
    try
    {
        if(select)
        {
            return await Genre.findById(genreId).select(select);
        }
        return await Genre.findById(genreId);
    }
    catch(error)
    {
        printError(error);
    }
}

export const FindGenreByIDAndUpdate  = async (genreId: string, data: Record<string, any>) =>
{
    try
    {
        return await Genre.findByIdAndUpdate(genreId, data);
    }
    catch(error)
    {
        printError(error);
    }
}

export const FindGenreByIDAndDelete = async (genreId: string, data: Record<string, any>) =>
{
    try
    {
        return await Genre.findByIdAndDelete(genreId, data);
    }
    catch(error)
    {
        printError(error);
    }
}