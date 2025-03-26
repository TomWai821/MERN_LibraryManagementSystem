import { Request, Response } from 'express'
import { CreateBookLoaned, GetBookLoaned } from '../schema/book/bookLoaned';
import { AuthRequest } from '../model/requestInterface';

export const GetLoanBookRecord = async (req: Request, res:Response) => 
{
    const suggestType = req.params.type;
    let success = false;
    
    try
    {
        let getLoanRecord:any[] | undefined;

        switch(suggestType)
        {
            case "mostPopular": 
                getLoanRecord = await GetBookLoaned(undefined, 8);
                break;

            default:
                getLoanRecord = await GetBookLoaned();
        }

        if(!getLoanRecord)
        {
            return res.status(400).json("Failed to Get Loaned Book Record")
        }

        success = true;
        res.json({success, foundLoanBook: getLoanRecord})
    }
    catch(error)
    {
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
            return res.status(400).json({success, error:"Failed to create Loaned Book Record"})
        }

        success = true;
        res.json({success, message: "Create Loaned Book Record Successfully!"})
    }
    catch(error)
    {
        return res.status(500).json({success, error: "Internal Server Error!" })
    }
}

export const UpdateLoanBookRecord = async (req: Request, res:Response) => 
{
    const {id, userID, bookID, loanDate, dueDate, status} = req.body;
    let success = false;

    try
    {
        success = true;
        res.json({success, message: "Update Loan Book Record Successfully!"})
    }
    catch(error)
    {
        return res.status(500).json({success, error: "Internal Server Error!" })
    }
}
