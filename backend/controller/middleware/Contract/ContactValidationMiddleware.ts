import { Request, Response, NextFunction } from "express";
import { contactHandler } from "../../contactController";

export const ContactTypeValidation = async (req: Request, res: Response, next:NextFunction) => 
{
    const contactType = req.params.type as keyof typeof contactHandler;
    let success = false;

    if (!contactHandler[contactType]) 
    {
        return res.status(404).json({ success, error: `Invalid type: ${contactType}` });
    }
    next();
};

export const ContactDataValidation = async (req: Request, res: Response, next:NextFunction) => 
{
    const contactType = req.params.type as keyof typeof contactHandler;

    const isInvalidDataType = (invalidField: string) => 
    {
        if (req.body[invalidField]) 
        {
            return res.status(400).json({ success: false, error: `Invalid data type in JSON file: ${invalidField}` });
        }
    };
    
    if (contactType === "Author")
    {
        isInvalidDataType("publisher");
    }

    if (contactType === "Publisher") 
    {
        isInvalidDataType("author");
    }

    next();
};