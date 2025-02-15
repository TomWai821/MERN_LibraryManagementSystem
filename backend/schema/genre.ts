import mongoose from 'mongoose';
import { GenreInterface } from '../model/dbInterface';

const genreSchema = new mongoose.Schema<GenreInterface>
(
    {
        genreID: { type: String, default: "General", require: true },
    }
)

const Genre = mongoose.model<GenreInterface>('Genre', genreSchema);
