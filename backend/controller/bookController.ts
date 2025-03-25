import fs from 'fs'
import { Request, Response } from 'express'
import { CreateBook, FindBookByIDAndDelete, FindBookByIDAndUpdate, GetBook } from '../schema/book/book';
import { AuthRequest } from '../model/requestInterface';

export const GetBookRecord = async (req: AuthRequest, res: Response) => 
{
    let success = false;

    try 
    {
        const foundBook = req.foundBook;

        if (!foundBook) 
        {
            return res.status(404).json({ success: false, error: "Book record not found!" });
        }

        // Ensure `foundBook` is always an array
        const books = Array.isArray(foundBook) ? foundBook : [foundBook];

        // Add imageUrl to each book
        const booksWithImageUrls = books.map((book) => 
        (
            {
                ...book, imageUrl: book.image?.filename ? `http://localhost:5000/api/book/uploads/${book.image.filename}`: null,
            }
        ));

        success = true;
        return res.json({ success, foundBook: booksWithImageUrls });
    } 
    catch (error) 
    {
        console.error("Error in GetBookRecord:", error);
        res.status(500).json({ success: false, error: "Internal Server Error!" });
    }
};

export const GetBookImage = async(req:Request, res:Response) => 
{
    const { filename } = req.params; 
    const filePath = `./backend/upload/${filename}`;

    fs.access(filePath, fs.constants.F_OK, (err) => 
    {
        if (err) 
        {
            return res.status(404).json({ error: "File not found" });
        }

        res.sendFile(filePath, { root: "." });
    });
}

export const CreateBookRecord = async (req:Request, res:Response) => 
{
    const { bookname, languageID, genreID, pages, description } = req.body;
    let success = false;

    try
    {
        const imagePath = req.file?.path;
        const imageName = req.file?.filename;
        const createBook = await CreateBook({ image: {path:imagePath, filename:imageName}, bookname, languageID, genreID, pages, description });

        if(!createBook)
        {
            return res.status(400).json({success, error: "Failed to create book record"});
        }

        success = true;
        res.json({success, message: "Book Record Create Successfully!"});
    }
    catch(error)
    {
        console.log(error);
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