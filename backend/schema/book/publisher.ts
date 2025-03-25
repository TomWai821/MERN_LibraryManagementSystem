import mongoose, { ObjectId } from 'mongoose';
import { PublisherInterface } from '../../model/bookSchemaInterface';
import { printError } from '../../controller/Utils';

const publisherSchema = new mongoose.Schema<PublisherInterface>
(
    {
        publisher: { type: String, required:true },
        address: { type: String },
        phoneNumber: { type: String },
        email: { type:String }
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

export const FindPublisherByID = async (publisherID: string, select?: Record<string, any>) => 
{
    try
    {
        if(select)
        {
            return await Publisher.findById(publisherID).select(select);
        }
        return await Publisher.findById(publisherID);
    }
    catch(error)
    {
        printError(error);
    }
}

export const FindPublisherByIDAndUpdate = async (publisherID: string, data: Record<string, any>) => 
{
    try
    {
        return await Publisher.findByIdAndUpdate(publisherID, data);
    }
    catch(error)
    {
        printError(error);
    }
}

export const FindPublisherByIDAndDelete = async (publisherID: ObjectId) =>
{
    try
    {
        return await Publisher.findByIdAndDelete(publisherID);
    }
    catch(error)
    {
        printError(error);
    }
}