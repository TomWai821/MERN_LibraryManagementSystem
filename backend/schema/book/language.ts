import mongoose from 'mongoose';
import { LanguageInterface } from '../../model/bookSchemaInterface';
import { printError } from '../../controller/Utils';

const languageSchema = new mongoose.Schema<LanguageInterface>
(
    {
        _id: { type: String, required: true },
        language: { type: String, required:true },
        shortName: { type:String, require: true },
        createdAt: { type: Date, default: Date.now, immutable: true }
    }
)

const Language = mongoose.model<LanguageInterface>('Language', languageSchema);

export const CreateLanguage = async (data:Record<string, any>) => 
{
    try
    {
        return await Language.create(data);
    }
    catch(error)
    {
        printError(error);
    }
}

export const GetLanguage = async (data?:Record<string, any>) =>
{
    try
    {
        if(!data)
        {
            return await Language.find({});
        }
        return await Language.find(data);
    }
    catch(error)
    {
        printError(error);
    }

};
        
export const FindLanguage = async (data: Record<string, any>) => 
{
    try
    {
        return await Language.findOne(data);
    }
    catch(error)
    {
        printError(error);
    }
}

export const FindLanguageByID = async (language: string, select?: Record<string, any>) => 
{
    try
    {
        if(select)
        {
            return await Language.findById(language).select(select);
        }
        return await Language.findById(language);
    }
    catch(error)
    {
        printError(error);
    }
}

export const FindLanguageByIDAndUpdate = async (language: string, data: Record<string, any>) => 
{
    try
    {
        return await Language.findByIdAndUpdate(language, data);
    }
    catch(error)
    {
        printError(error);
    }
}

export const FindLanguageByIDAndDelete = async (language: string, data: Record<string, any>) =>
{
    try
    {
        return await Language.findByIdAndDelete(language, data);
    }
    catch(error)
    {
        printError(error);
    }
}