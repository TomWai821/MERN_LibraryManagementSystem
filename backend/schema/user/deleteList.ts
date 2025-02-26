import mongoose from "mongoose";
import { DeleteListInterface } from "../../model/userSchemaInterface";

const DeleteListSchema = new mongoose.Schema<DeleteListInterface>
(
    {
        _id: { type: String, required: true },
        userID: { type: mongoose.Schema.Types.ObjectId, ref:'User', required: true },
        startDate: { type: Date, required: true },
        dueDate: { type: Date, required: true },
        createdAt: { type: Date, default: Date.now, immutable: true }
    }
)

const DeleteList = mongoose.model<DeleteListInterface>('DeleteList', DeleteListSchema);