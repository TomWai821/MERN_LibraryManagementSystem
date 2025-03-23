import mongoose, { PipelineStage } from 'mongoose';
import { BookInterface } from '../../model/bookSchemaInterface';
import { printError } from '../../controller/Utils';
import { bookStatusArray } from '../../Arrays/TypeArrayForBook';

const BookSchema = new mongoose.Schema<BookInterface>
(
    {
        image: 
        {  
            path: { type: String }, 
            filename: { type: String }, 
            size: { type: Number },  
            uploadedAt: { type: Date, default: Date.now }
        },  
        bookname: { type: String, required: true },
        languageID: { type: mongoose.Types.ObjectId, ref: 'Language', required: true },
        genreID: { type: mongoose.Types.ObjectId, ref: 'Genre', required: true },
        pages: { type: Number, required: true, min: 1 },
        status: { type: String, required: true , default: 'OnShelf', enum:bookStatusArray},
        description: { type: String, default: '' },
        createdAt: { type: Date, default: Date.now, immutable: true }
    }
)

const Book = mongoose.model<BookInterface>('Book', BookSchema);

export const CreateBook = async (data:Record<string, any>) =>
{
    try
    {
        return await Book.create(data);
    }
    catch(error)
    {
        printError(error);
    }
}

export const GetBook = async (data?:Record<string, any>) =>
{
    try
    {
        if(!data)
        {
            return await GetBooksWithOtherDetails();
        }
        return await Book.find(data);
    }
    catch(error)
    {
        printError(error);
    }
};

// Local variable(For get banned user data)
const GetBooksWithOtherDetails = async () => 
{
    let pipeline:PipelineStage[] = [];

    pipeline.push(
        {
            $lookup: {
                from: 'genres',
                localField: 'genreID',
                foreignField: '_id',
                as: 'genreDetails'
            }
        },
        {
            $unwind: {
                path: '$genreDetails',
                preserveNullAndEmptyArrays: true 
            }
        },
        {
            $lookup: {
                from: 'languages',
                localField: 'languageID',
                foreignField: '_id',
                as: 'languageDetails'
            }
        },
        {
            $unwind: {
                path: '$languageDetails', // Specify the field to unwind
                preserveNullAndEmptyArrays: true // Optional: Keeps documents without a match
            }
        },
    );

    return await Book.aggregate(pipeline);
}
        
export const FindBook = async (data: Record<string, any>) => 
{
    try
    {
        return await Book.findOne(data);
    }
    catch(error)
    {
        printError(error);
    }
}

export const FindBookByID = async (bookID: string, select?: Record<string, any>) => 
{
    try
    {
        if(select)
        {
            return await Book.findById(bookID).select(select);
        }
        return await Book.findById(bookID);
    }
    catch(error)
    {
        printError(error);
    }
}

export const FindBookByIDAndUpdate = async (bookID: string, data: Record<string, any>) => 
{
    try
    {
        return await Book.findByIdAndUpdate(bookID, data);
    }
    catch(error)
    {
        printError(error);
    }
}

export const FindBookByIDAndDelete = async (bookID: string) =>
{
    try
    {
        return await Book.findByIdAndDelete(bookID);
    }
    catch(error)
    {
        printError(error);
    }
}