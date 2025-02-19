import mongoose from 'mongoose';
import { AuthorInterface } from '../../model/bookSchemaInterface';

const AuthorSchema = new mongoose.Schema<AuthorInterface>
(
    {
        _id: { type: String, require: true },
        author: { type: String, require:true }
    }
)

const Author = mongoose.model<AuthorInterface>('Author', AuthorSchema);