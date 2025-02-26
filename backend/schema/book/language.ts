import mongoose from 'mongoose';
import { LanguageInterface } from '../../model/bookSchemaInterface';

const languageSchema = new mongoose.Schema<LanguageInterface>
(
    {
        _id: { type: String, required: true },
        language: { type: String, required:true }
    }
)

const Language = mongoose.model<LanguageInterface>('Language', languageSchema);

class LanguageService
{
    async CreateLanguage(data:Record<string, any>)
    {
        try
        {
            const language = await Language.create(data);
            return language;
        }
        catch(error)
        {
            if (error instanceof Error) 
            {
                throw new Error(error.message);
            } 
            else 
            {
                throw new Error('An unknown error occurred');
            }
        }
    }

    async GetLanguage (data?:Record<string, any>)
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
            if (error instanceof Error) 
            {
                throw new Error(error.message);
            } 
            else 
            {
                throw new Error('An unknown error occurred');
            }
        }
    
    };
        
    async FindLanguage (data: Record<string, any>)
    {
        try
        {
            return await Language.findOne(data);
        }
        catch(error)
        {
            if (error instanceof Error) 
            {
                throw new Error(error.message);
            } 
            else 
            {
                throw new Error('An unknown error occurred');
            }
        }
    }

    async FindLanguageByID (language: string, select?: Record<string, any>)
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
            if (error instanceof Error) 
            {
                throw new Error(error.message);
            } 
            else 
            {
                throw new Error('An unknown error occurred');
            }
        }
    }

    async FindLanguageByIDAndUpdate (language: string, data: Record<string, any>)
    {
        try
        {
            return await Language.findByIdAndUpdate(language, data);
        }
        catch(error)
        {
            if (error instanceof Error) 
            {
                throw new Error(error.message);
            } 
            else 
            {
                throw new Error('An unknown error occurred');
            }
        }
    }

    async FindLanguageByIDAndDelete (language: string, data: Record<string, any>)
    {
        try
        {
            return await Language.findByIdAndDelete(language, data);
        }
        catch(error)
        {
            if (error instanceof Error) 
            {
                throw new Error(error.message);
            } 
            else 
            {
                throw new Error('An unknown error occurred');
            }
        }
    }
}

export default new LanguageService();
