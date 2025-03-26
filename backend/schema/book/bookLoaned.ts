import mongoose, { PipelineStage } from "mongoose";
import { BookIssuedInterface } from "../../model/bookSchemaInterface";
import { printError } from "../../controller/Utils";

const BookLoanedSchema = new mongoose.Schema<BookIssuedInterface>
(   
    {
        userID: { type: mongoose.Types.ObjectId, ref: 'User', required: true },
        bookID: { type: mongoose.Types.ObjectId, ref: 'Book', required: true },
        loanDate: { type:Date, required: true },
        dueDate: { type:Date, required: true },
        status: { type:String, enum: ['Returned', 'Loaned', 'Returned(Late)'], default: 'Loaned'}
    }
)

const BookLoaned = mongoose.model<BookIssuedInterface>('BookLoaned', BookLoanedSchema);

export const CreateBookLoaned = async (data:Record<string, any>) =>
{
    try
    {
        return await BookLoaned.create(data);
    }
    catch(error)
    {
        printError(error);
    }
}

export const GetBookLoaned = async (data?:Record<string, any>, limit?:number) =>
{
    try
    {
        if(limit)
        {
            return await GetSuggestBookDetails(data, limit);
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
        ...lookupAndUnwind('users', 'userID', '_id', 'userDetails'),
        ...lookupAndUnwind('books', 'bookID', '_id', 'bookDetails'),
    );
    return await BookLoaned.aggregate(pipeline);
}
 
const GetSuggestBookDetails = async (data?: Record<string, any>, limit?: number) => 
{
    let pipeline: PipelineStage[] = [];

    if (data) { pipeline.push({ $match: { ...data } })}

    pipeline.push({ $group: { _id: "$bookID", count: { $sum: 1 } }});

    pipeline.push({ $sort: { count: -1 } });

    if (limit) {pipeline.push({ $limit: limit });}

    pipeline.push(
        {
            $lookup: 
            {
                from: "books",         // Reference the 'books' collection
                localField: "_id",     // Match grouped _id (bookID)
                foreignField: "_id",   // Match with books collection _id
                as: "bookDetails"      // Include book details in the result
            }
        }
    );

    // Unwind bookDetails array to simplify the results
    pipeline.push({ $unwind: { path: "$bookDetails",  preserveNullAndEmptyArrays: true }});

    return await BookLoaned.aggregate(pipeline);
};

        
export const FindBookLoaned = async (data: Record<string, any>) =>
{
    try
    {
        return await BookLoaned.findOne(data);
    }
    catch(error)
    {
        printError(error);
    }
}

export const FindBookLoanedByID = async (bookLoanedId: string, select?: Record<string, any>) =>
{
    try
    {
        if(select)
        {
            return await BookLoaned.findById(bookLoanedId).select(select);
        }
        return await BookLoaned.findById(bookLoanedId);
    }
    catch(error)
    {
        printError(error);
    }
}

export const FindBookLoanedByIDAndUpdate  = async (bookLoanedId: string, data: Record<string, any>) =>
{
    try
    {
        return await BookLoaned.findByIdAndUpdate(bookLoanedId, data);
    }
    catch(error)
    {
        printError(error);
    }
}

export const FindBookLoanedByIDAndDelete = async (bookLoanedId: string, data: Record<string, any>) =>
{
    try
    {
        return await BookLoaned.findByIdAndDelete(bookLoanedId, data);
    }
    catch(error)
    {
        printError(error);
    }
}