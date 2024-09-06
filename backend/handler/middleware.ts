import { Response, Request, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { jwtVerify } from './hashing';
const JWT_SECRET:string = "Wh@t@ver";

export interface AuthRequest extends Request
{
    user?: { id:string };
}


const fetchuser = async (req: AuthRequest, res: Response, next: NextFunction) => 
{
    try 
    {
        const token = req.header('auth-token');
    
        if (!token) 
        {
            return res.status(401).send({ error: "Please authenticate using a valid token" });
        }

        const data = await jwtVerify(token);

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

export default fetchuser;