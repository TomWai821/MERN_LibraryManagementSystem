import mongoose from "mongoose";
import { BanListInterface } from "../../model/userSchemaInterface";

const BanListSchema = new mongoose.Schema<BanListInterface>
(
    {
        _id: { type: String, required: true },
        userID: { type: mongoose.Schema.Types.ObjectId, ref:'User', required: true },
        description: { type: String, required: true },
        startDate: { type: Date, required: true },
        dueDate: { type: Date, required: true },
        createdAt: { type: Date, default: Date.now, immutable: true }
    }
)

const BanList = mongoose.model<BanListInterface>('BanList', BanListSchema);