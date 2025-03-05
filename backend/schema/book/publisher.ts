import mongoose from 'mongoose';
import { PublisherInterface } from '../../model/bookSchemaInterface';
import { printError } from '../../controller/Utils';

const publisherSchema = new mongoose.Schema<PublisherInterface>
(
    {
        _id: { type: String, required: true },
        publisher: { type: String, required: true },
        address: { type: String, required: true },
        phoneNumber: { type: String, required: true },
        email: { type: String, required: true },
        createdAt: { type: Date, default: Date.now, immutable: true }
    }
)

const Publisher = mongoose.model<PublisherInterface>('Publisher', publisherSchema);

export const CreatePublisher = async (data:Record<string, any>) => 
{
    try
    {
        return await Publisher.create(data);
    }
    catch(error)
    {
        printError(error);
    }
}

export const GetPublisher = async (data?:Record<string, any>) =>
{
    try
    {
        if(!data)
        {
            return await Publisher.find({});
        }
        return await Publisher.find(data);
    }
    catch(error)
    {
        printError(error);
    }

};
        
export const FindPublisher = async (data: Record<string, any>) => 
{
    try
    {
        return await Publisher.findOne(data);
    }
    catch(error)
    {
        printError(error);
    }
}

export const FindPublisherByID = async (publisher: string, select?: Record<string, any>) => 
{
    try
    {
        if(select)
        {
            return await Publisher.findById(publisher).select(select);
        }
        return await Publisher.findById(publisher);
    }
    catch(error)
    {
        printError(error);
    }
}

export const FindPublisherByIDAndUpdate = async (publisher: string, data: Record<string, any>) => 
{
    try
    {
        return await Publisher.findByIdAndUpdate(publisher, data);
    }
    catch(error)
    {
        printError(error);
    }
}

export const FindPublisherByIDAndDelete = async (publisher: string, data: Record<string, any>) =>
{
    try
    {
        return await Publisher.findByIdAndDelete(publisher, data);
    }
    catch(error)
    {
        printError(error);
    }
}