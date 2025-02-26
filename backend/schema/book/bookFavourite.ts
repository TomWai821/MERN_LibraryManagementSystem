import mongoose from "mongoose";
import { BookFavouriteInterface } from "../../model/bookSchemaInterface";

const BookFavouriteSchema = new mongoose.Schema<BookFavouriteInterface>
(   
    {
        _id: { type: String, required: true },
        userID: { type: mongoose.Schema.Types.ObjectId, required: true },
        bookID: { type: mongoose.Schema.Types.ObjectId, required: true },
        createdAt: { type: Date, default: Date.now, immutable: true }
    }
)

const BookFavourite = mongoose.model<BookFavouriteInterface>('BookFavourite', BookFavouriteSchema);