import mongoose from 'mongoose';
import { BookInterface } from '../model/dbInterface';

const bookSchema = new mongoose.Schema<BookInterface>
(
    {
        name: { type: String, required: true },
        genre: { type: String, default: "General", require: true },
        publisher: { type: String, required: true },
        author: { type: String, required: true },
        page: { type: Number, required: true },
        createdAt: { type: Date, default: Date.now }
    }
)

const Book = mongoose.model<BookInterface>('book', bookSchema);
export default Book;
