import { Request, Response } from 'express'
import { CreateBook, FindBookByIDAndDelete, FindBookByIDAndUpdate, GetBook } from '../schema/book/book';

export const GetAllBookRecord = async (req:Request, res:Response) => 
{
    let success = false;

    try
    {
        const foundBook = await GetBook();

        success = true;
        res.json({ success, foundBook })
    }
    catch(error)
    {
        res.status(500).json({ success, error: 'Internal Server Error!' });
    }
}

export const CreateBookRecord = async (req:Request, res:Response) => 
{
    const { bookname, languageID, genreID, pages, description } = req.body;
    let success = false;

    try
    {
        const createBook = await CreateBook({ bookname, languageID, genreID, pages, description });

        if(!createBook)
        {
            return res.status(400).json({success, error: "Failed to create book record"});
        }

        success = true;
        res.json({success, message: "Book Record Create Successfully!"});
    }
    catch(error)
    {
        res.status(500).json({ success, error: 'Internal Server Error!' });
    }
}

export const EditBookRecord = async(req:Request, res:Response) => 
{
    const bookID = req.params.id;
    const { bookname, languageID, genreID, pages, description } = req.body;
    let success = false;

    try
    {
        const updateBookRecord = await FindBookByIDAndUpdate(bookID, { bookname, languageID, genreID, pages, description });

        if(!updateBookRecord)
        {
            return res.status(400).json({success, error: "Failed to Update book record"});
        }

        success = true;
        res.json({success, message: "Book Record Update Successfully!"});
    }
    catch(error)
    {
        res.status(500).json({ success, error: 'Internal Server Error!' });
    }
}

export const DeleteBookRecord = async(req:Request, res:Response) => 
{
    const bookID = req.params.id;
    let success = false;

    try
    {
        const deleteBookRecord = await FindBookByIDAndDelete(bookID);

        if(!deleteBookRecord)
        {
            return res.status(400).json({success, error: "Failed to Delete book record"});
        }

        success = true;
        res.json({success, message: "Book Record Delete Successfully!"});
    }
    catch(error)
    {
        res.status(500).json({ success, error: 'Internal Server Error!' });
    }
}