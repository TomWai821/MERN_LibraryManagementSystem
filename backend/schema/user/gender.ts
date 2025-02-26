import mongoose from 'mongoose';
import { GenderInterface } from '../../model/userSchemaInterface';

const GenreSchema = new mongoose.Schema<GenderInterface>
(
    {
        _id: { type: String, required: true },
        gender: { type: String, required: true }
    }
)

const Gender = mongoose.model<GenderInterface>('Gender', GenreSchema);