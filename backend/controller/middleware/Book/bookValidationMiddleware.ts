import { NextFunction, Request, Response } from 'express';
import { FindBook, FindBookByID } from "../../../schema/book/book";
import { FindGenreByID } from "../../../schema/book/genre";
import { FindLanguageByID } from "../../../schema/book/language";
import { AuthRequest } from '../../../model/requestInterface';
import { FindBookLoaned } from '../../../schema/book/bookLoaned';

export const BookNameValidation = async (req:Request, res:Response, next: NextFunction) => 
{
    const { bookname } = req.body;
    let success = false;

    try
    {
        const findBookname = await FindBook({ bookname: bookname });

        if(findBookname)
        {
            return res.status(400).json({success, error: "Book with this name are already exist!"});
        }
        next();
    }
    catch(error)
    {
        console.log(error);
        res.status(500).json({ success, error: 'Internal Server Error!' });
    }
}

export const BookRecordIDValidation = async (req:AuthRequest, res:Response, next:NextFunction) => 
{
    const bookID = req.params.id;
    let success = false;

    try
    {
        const findRecordWithID = await FindBookByID(bookID);

        if(!findRecordWithID)
        {
            return res.status(404).json({success, error: "Could not found this book record!"});
        }

        next();
    }
    catch(error)
    {
        res.status(500).json({ success, error: 'Internal Server Error!' });
    }
}

export const BookGenreIDAndLanguageIDValidation = async (req:Request, res:Response, next: NextFunction) => 
{   
    const { languageID, genreID } = req.body;
    let success = false;

    try
    {
        const findLanguageID = await FindLanguageByID(languageID);

        if(!findLanguageID)
        {
            return res.status(404).json({success, error: `Could not found Language ID: ${languageID}!`});
        }

        const findGenreID = await FindGenreByID(genreID);

        if(!findGenreID)
        {
            return res.status(404).json({success, error: `Could not found Genre ID: ${genreID}!`});
        }

        next();
    }
    catch(error)
    {
        console.log(error);
        res.status(500).json({ success, error: 'Internal Server Error!' });
    }
}

export const FoundBookLoanRecord = async (req:AuthRequest, res:Response, next: NextFunction) => 
{
    const loanBookID = req.params.id;
    let success = false;

    try
    {
        const foundLoanRecord = await FindBookLoaned({_id: loanBookID});

        if(!foundLoanRecord)
        {
            return res.status(404).json({success, error: `Could not found Loan Record!`});
        }

        req.foundLoanedRecord = foundLoanRecord;
        next();
    }
    catch(error)
    {
        console.log(error);
        res.status(500).json({ success, error: 'Internal Server Error!' });
    }
}

export const buildLoanedQuery = (queryParams: any) => 
{
    const { bookname, username, status } = queryParams;

    const query = 
    {
        ...(bookname && { "bookDetails.bookname": { $regex: bookname, $options: "i" } }),
        ...(username && { "userDetails.username": { $regex: username, $options: "i" } }),
        ...(status && { "status": status }),
    };

    return query;
}
