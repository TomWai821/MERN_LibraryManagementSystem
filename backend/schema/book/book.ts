import mongoose from 'mongoose';
import { BookInterface } from '../../model/bookSchemaInterface';

const BookSchema = new mongoose.Schema<BookInterface>
(
    {
        _id: { type: String, required: true},
        bookname: { type: String, required: true },
        languageID: {type: mongoose.Schema.Types.ObjectId, ref:'Language', required: true },
        genreID: { type: mongoose.Schema.Types.ObjectId, ref:'Genre', required: true },
        publisherID: { type: mongoose.Schema.Types.ObjectId, ref:'Publisher', required: true },
        authorID: { type: mongoose.Schema.Types.ObjectId, ref:'Publisher', required: true },
        page: { type: Number, required: true },
        description: {type: String },
        createdAt: { type: Date, default: Date.now }
    }
)

const Book = mongoose.model<BookInterface>('Book', BookSchema);

class BookService
{
    async CreateBook(data:Record<string, any>)
    {
        try
        {
            const book = await Book.create(data);
            return book;
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

    async GetBook (data?:Record<string, any>)
    {
        try
        {
            if(!data)
            {
                return await Book.find({});
            }
            return await Book.find(data);
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
        
    async FindBook (data: Record<string, any>)
    {
        try
        {
            return await Book.findOne(data);
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

    async FindBookByID (book: string, select?: Record<string, any>)
    {
        try
        {
            if(select)
            {
                return await Book.findById(book).select(select);
            }
            return await Book.findById(book);
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

    async FindBookByIDAndUpdate (book: string, data: Record<string, any>)
    {
        try
        {
            return await Book.findByIdAndUpdate(book, data);
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

    async FindBookByIDAndDelete (book: string, data: Record<string, any>)
    {
        try
        {
            return await Book.findByIdAndDelete(book, data);
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

export default new BookService();
