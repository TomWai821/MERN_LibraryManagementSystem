import {model, Schema, now} from 'mongoose'
import mongoose from 'mongoose'
import { noteInterface } from '../interface/NoteInterface';

const noteSchema = new Schema<noteInterface>
(
    {
        user: { Type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true },
        title: { Type: String, required:true },
        content: { Type: String, required:true },
        tag: { Type: String, default:"General" },
        date: { Type: Date, now }
    }
)

const note = model<noteInterface>('note', noteSchema);
module.exports = note;