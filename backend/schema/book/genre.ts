import mongoose from 'mongoose';
import { GenreInterface } from '../../model/bookSchemaInterface';

const GenreSchema = new mongoose.Schema<GenreInterface>
(
    {
        _id: { type: String, require: true },
        genre: { type: String, require:true }
    }
)

const Genre = mongoose.model<GenreInterface>('Genre', GenreSchema);

class GenreService
{
    async CreateBook(data:Record<string, any>)
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
}

export default new GenreService();