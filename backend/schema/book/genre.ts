import mongoose from 'mongoose';
import { GenreInterface } from '../../model/bookSchemaInterface';

const GenreSchema = new mongoose.Schema<GenreInterface>
(
    {
        _id: { type: String, required: true },
        genre: { type: String, required: true },
        createdAt: { type: Date, default: Date.now, immutable: true }
    }
)

const Genre = mongoose.model<GenreInterface>('Genre', GenreSchema);

class GenreService
{
    async CreateGenre(data:Record<string, any>)
    {
        try
        {
            const genre = await Genre.create(data);
            return genre;
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

    async GetGenre (data?:Record<string, any>)
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
        
    async FindGenre (data: Record<string, any>)
    {
        try
        {
            return await Genre.findOne(data);
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

    async FindGenreByID (genre: string, select?: Record<string, any>)
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

    async FindGenreByIDAndUpdate (genre: string, data: Record<string, any>)
    {
        try
        {
            return await Genre.findByIdAndUpdate(genre, data);
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

    async FindGenreByIDAndDelete (genre: string, data: Record<string, any>)
    {
        try
        {
            return await Genre.findByIdAndDelete(genre, data);
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

export default new GenreService();