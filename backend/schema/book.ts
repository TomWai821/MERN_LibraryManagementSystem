import mongoose from 'mongoose';
import { BookInterface } from '../model/dbInterface';

const bookSchema = new mongoose.Schema<BookInterface>
(
    {
        author: { type: String, required: true },
        title: { type: String, required: true },
        content: { type: String, required: true },
        tag: { type: String, default:"General" },
        createdAt: { type: Date, default: Date.now }
    }
)

const Book = mongoose.model<BookInterface>('book', bookSchema);
export default Book;
