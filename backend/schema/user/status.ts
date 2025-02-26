import mongoose from "mongoose";
import { StatusInterface } from "../../model/userSchemaInterface";

const StatusSchema = new mongoose.Schema<StatusInterface>
(
    {
        _id: { type: String, required: true },
        status: { type: String, required: true },
        description: { type:String, required: true}
    }
)

const Status = mongoose.model<StatusInterface>('Status', StatusSchema);