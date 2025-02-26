import mongoose from "mongoose";
import { BookReturnInterface } from "../../model/bookSchemaInterface";

const BookReturnSchema = new mongoose.Schema<BookReturnInterface>
(   
    {
        _id: { type: String, required: true },
        issueID: { type: mongoose.Schema.Types.ObjectId, required: true },
        returnDate: { type: Date, required: true}
    }
)

const BookReturn = mongoose.model<BookReturnInterface>('BookReturn', BookReturnSchema);