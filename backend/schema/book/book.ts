import mongoose, { ObjectId, PipelineStage } from 'mongoose';
import { BookInterface } from '../../model/bookSchemaInterface';
import { printError } from '../../controller/Utils';
import { bookStatusArray } from '../../Arrays/TypeArrayForBook';

const BookSchema = new mongoose.Schema<BookInterface>
(
    {
        image: 
        {  
            url: { type: String }, 
            filename: { type: String }
        },
        bookname: { type: String, required: true },
        languageID: { type: mongoose.Types.ObjectId, ref: 'Language', required: true },
        genreID: { type: mongoose.Types.ObjectId, ref: 'Genre', required: true },
        authorID: { type: mongoose.Types.ObjectId, ref: 'Author', required: true },
        publisherID: { type: mongoose.Types.ObjectId, ref: 'Publusher', required: true },
        status: { type: String, required: true , default: 'OnShelf', enum: bookStatusArray},
        description: { type: String, default: '' },
        publishDate: { type: Date, default: Date.now, immutable: true  }
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

export const GetBook = async (data?:Record<string, any>, sortRequirement?:Record<string, any>, limit?:number) =>
{
    try
    {
        return await GetBooksWithOtherDetails(data, sortRequirement, limit);
    }
    catch(error)
    {
        printError(error);
    }
};

const lookupAndUnwind = (from:string, localField:string, foreignField:string, asField:string) => 
(
    [
        { $lookup: { from, localField, foreignField, as: asField } },
        { $unwind: { path: `$${asField}`, preserveNullAndEmptyArrays: true } }
    ]
);

// Local variable(For get banned user data)
const GetBooksWithOtherDetails = async (data?:Record<string, any>, sortRequirement?:Record<string, any>, limit?:number) => 
{
    let pipeline:PipelineStage[] = [];

    const otherRequirement = 
    [
        ...(data ? [{ $match: {...data} }]: []),
        ...(sortRequirement ? [{ $sort: sortRequirement }]: []),
        ...(limit ? [{ $limit: limit }] : []),
    ];
    
    pipeline.push(
        ...lookupAndUnwind('genres', 'genreID', '_id', 'genreDetails'),
        ...lookupAndUnwind('languages', 'languageID', '_id', 'languageDetails'),
        ...lookupAndUnwind('authors', 'authorID', '_id', 'authorDetails'),
        ...lookupAndUnwind('publishers', 'publisherID', '_id', 'publisherDetails'),
    );

    pipeline.push(...otherRequirement);

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