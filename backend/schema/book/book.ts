import mongoose, { PipelineStage } from 'mongoose';
import { BookInterface } from '../../model/bookSchemaInterface';
import { printError } from '../../controller/Utils';
import { bookStatusArray } from '../../Arrays/TypeArrayForBook';

const BookSchema = new mongoose.Schema<BookInterface>
(
    {
        image: {  path: { type: String }, filename: { type: String }},
        bookname: { type: String, required: true },
        languageID: { type: mongoose.Types.ObjectId, ref: 'Language', required: true },
        genreID: { type: mongoose.Types.ObjectId, ref: 'Genre', required: true },
        authorID: { type: mongoose.Types.ObjectId, ref: 'Author', required: true },
        publisherID: { type: mongoose.Types.ObjectId, ref: 'Publusher', required: true },
        status: { type: String, required: true , default: 'OnShelf', enum: bookStatusArray},
        description: { type: String, default: '' }
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
        return await GetBooksWithOtherDetails(data);
    }
    catch(error)
    {
        printError(error);
    }
};

// Local variable(For get banned user data)
const GetBooksWithOtherDetails = async (data?:Record<string, any>) => 
{
    let pipeline:PipelineStage[] = [];

    if (data) { pipeline.push( {$match: {...data}} )}

    const lookupAndUnwind = (from:string, localField:string, foreignField:string, asField:string) => 
    (
        [
            { $lookup: { from, localField, foreignField, as: asField } },
            { $unwind: { path: `$${asField}`, preserveNullAndEmptyArrays: true } }
        ]
    );
    
    pipeline.push(
        ...lookupAndUnwind('genres', 'genreID', '_id', 'genreDetails'),
        ...lookupAndUnwind('languages', 'languageID', '_id', 'languageDetails'),
        ...lookupAndUnwind('authors', 'authorID', '_id', 'authorDetails'),
        ...lookupAndUnwind('publishers', 'publisherID', '_id', 'publisherDetails'),
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