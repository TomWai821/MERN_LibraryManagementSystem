import { Response, Request, NextFunction } from 'express';
import { jwtVerify } from './hashing';
import { DBUserInterface } from '../interface/dbInterface';

export interface AuthRequest extends Request
{
    user?: DBUserInterface;
}


export const fetchuser = async (req: AuthRequest, res: Response, next: NextFunction) => 
{
    try 
    {
        const authToken  = req.header("authToken");

        if(!authToken)
        {
            return res.status(401).send({ error: "Please authenticate using a valid token" });
        }

        const data = await jwtVerify(authToken);

        if(!data)
        {
            return res.status(401).send({ error: "Invalid token!" });
        }
        req.user = data.user;
        next();
    } 
    catch (error) 
    {
        return res.status(401).send({ error: "Please authenticate using a valid token" });
    }
};