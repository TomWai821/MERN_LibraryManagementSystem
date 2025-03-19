import { Request, Response } from 'express'
import { CreateBook, FindBook, GetBook } from '../schema/book/book';
import { FindLanguageByID } from '../schema/book/language';
import { FindGenreByID } from '../schema/book/genre';

export const GetAllBook = async (req:Request, res:Response) => 
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
    const { bookname, languageID, genreID, page, description } = req.body;
    let success = false;

    try
    {
        const findBookname = await FindBook({ bookname: bookname });

        if(findBookname)
        {
            return res.status(400).json({success, error: "Book with this name are already exist!"});
        }

        const findLanguageID = await FindLanguageByID(languageID);

        if(!findLanguageID)
        {
            return res.status(400).json({success, error: "Invaild Language ID!"});
        }

        const findGenreID = await FindGenreByID(genreID);

        if(!findGenreID)
        {
            return res.status(400).json({success, error: "Invaild Genre ID!"});
        }

        const createBook = await CreateBook({ bookname, languageID, genreID, page, description });

        if(!createBook)
        {
            return res.status(400).json({success, error: "Failed to create book"});
        }

        success = true;
        res.json({success, message: "Book Create Successfully!"});
    }
    catch(error)
    {
        res.status(500).json({ success, error: 'Internal Server Error!' });
    }
}