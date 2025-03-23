import mongoose from "mongoose";
import { BookIssuedInterface } from "../../model/bookSchemaInterface";

const BookLoanedSchema = new mongoose.Schema<BookIssuedInterface>
(   
    {
        userID: { type: mongoose.Types.ObjectId, ref: 'User', required: true },
        bookID: { type: mongoose.Types.ObjectId, ref: 'Book',required: true },
        issueDate: { type:Date, required: true },
        dueDate: { type:Date, required: true },
        status: { type:String, required: true, enum:['Returned', 'Loaned', 'Returned(Late)']},
        createdAt: { type: Date, default: Date.now, immutable: true }
    }
)

const BookLoaned = mongoose.model<BookIssuedInterface>('BookLoaned', BookLoanedSchema);