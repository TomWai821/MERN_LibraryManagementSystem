import { Response, Request, NextFunction } from 'express';
import { validationResult } from 'express-validator';
import { jwtVerify } from './hashing';
import { UserInterface } from '../model/dbInterface';

export interface AuthRequest extends Request
{
    user?: UserInterface;
}

export const Validate = (req: Request, res: Response, next: NextFunction) => 
{ 
    const errors = validationResult(req); 

    if (!errors.isEmpty()) 
    { 
        return res.status(400).json({ errors: errors.array() }); 
    }
    
    next();
}

export const FetchUser = async (req: AuthRequest, res: Response, next: NextFunction) => 
{
    try 
    {
        const authToken  = req.header("authToken");

        if(authToken)
        {
            const data = await jwtVerify(authToken);

            if(!data)
            {
                return res.status(401).send({ error: "Invalid token!" });
            }
            req.user = data.user;
        }

        next();
    } 
    catch (error) 
    {
        return res.status(401).send({ error: "Please authenticate using a valid token" });
    }
};