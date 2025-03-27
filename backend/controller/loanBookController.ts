import { Request, Response } from 'express'
import { CreateBookLoaned, FindBookLoanedByIDAndUpdate, GetBookLoaned } from '../schema/book/bookLoaned';
import { AuthRequest } from '../model/requestInterface';
import { FindBookByIDAndUpdate } from '../schema/book/book';
import { BookLoanedInterface } from '../model/bookSchemaInterface';
import { jwtVerify } from './hashing';
import { ObjectId } from 'mongodb';

export const GetLoanBookRecord = async (req: AuthRequest, res:Response) => 
{
    const suggestType = req.params.type;
    const authToken = req.header("authToken");
    let success = false;
    
    try
    {
        let getLoanRecord:any[] | undefined;
        let data:any;

        if(authToken)
        {
            data = await jwtVerify(authToken);
            req.user = data.user;
        }

        switch(suggestType)
        {
            case "mostPopular": 
                getLoanRecord = await GetBookLoaned(undefined, 8);
                break;

            default:
                getLoanRecord = req.user ? await GetBookLoaned({userID: new ObjectId(req.user._id as unknown as ObjectId)}) : await GetBookLoaned();
                break;
        }

        if(!getLoanRecord)
        {
            return res.status(400).json("Failed to Get Loaned Book Record");
        }

        success = true;
        res.json({success, foundLoanBook: getLoanRecord})
    }
    catch(error)
    {
        console.log(error);
        return res.status(500).json({success, error: "Internal Server Error!" })
    }
}

export const CreateLoanBookRecord = async (req: AuthRequest, res:Response) => 
{
    const {userID, bookID, loanDate, dueDate} = req.body;
    const id = req.user?._id;
    let success = false;
    
    try
    {
        const UserID = userID ?? id;
        const createLoanRecord = await CreateBookLoaned({userID:UserID, bookID, loanDate, dueDate})

        if(!createLoanRecord)
        {
            return res.status(400).json({success, error:"Failed to create Loaned Book Record"});
        }

        const changeBookState = await FindBookByIDAndUpdate(bookID, {status: 'Loaned'})

        if(!changeBookState)
        {
            return res.status(400).json({success, error:"Failed to change Book status"});
        }

        success = true;
        res.json({success, message: "Create Loaned Book Record Successfully!"})
    }
    catch(error)
    {
        return res.status(500).json({success, error: "Internal Server Error!" })
    }
}

export const UpdateLoanBookRecord = async (req: AuthRequest, res:Response) => 
{
    const { bookID } = req.body;
    const foundLoanedRecord = req.foundLoanedRecord as BookLoanedInterface;
    let success = false;

    try
    {
        const currentDate = new Date();
        const dueDate = foundLoanedRecord.dueDate;
        const status = dueDate && currentDate <= dueDate ? 'Returned' : 'Returned(Late)'

        const changeLoanRecordStatus = await FindBookLoanedByIDAndUpdate(bookID, {status: status})

        if(!changeLoanRecordStatus)
        {
            return res.status(400).json({success, error:"Failed to return Book"});
        }

        const changeBookStatus = await FindBookByIDAndUpdate(bookID, {status: 'OnShelf'});

        if(!changeBookStatus)
        {
            return res.status(400).json({success, error:"Failed to change Book status!"});
        }

        success = true;
        res.json({success, message: "Return Loan Book Successfully!"})
    }
    catch(error)
    {
        return res.status(500).json({success, error: "Internal Server Error!" })
    }
}

