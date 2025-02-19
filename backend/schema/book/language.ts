import mongoose from 'mongoose';
import {  LanguageInterface } from '../../model/bookSchemaInterface';

const languageSchema = new mongoose.Schema<LanguageInterface>
(
    {
        _id: { type: String, require: true },
        language: { type: String, require:true }
    }
)

const Language = mongoose.model<LanguageInterface>('Language', languageSchema);
