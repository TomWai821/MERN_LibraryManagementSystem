import mongoose from 'mongoose';
import { noteInterface } from '../interface/dbInterface';

const noteSchema = new mongoose.Schema<noteInterface>
(
    {
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true },
        title: { type: String, required: true },
        content: { type: String, required: true },
        tag: { type: String, default:"General" },
        createdAt: { type: Date, default: Date.now }
    }
)

const Note = mongoose.model<noteInterface>('note', noteSchema);
export default Note;
