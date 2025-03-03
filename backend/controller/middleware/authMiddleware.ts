import { NextFunction, Response } from "express";
import { jwtVerify } from "../hashing";
import { AuthRequest } from "../../model/requestInterface";

export const FetchUser = async (req: AuthRequest, res: Response, next: NextFunction) => 
{
    try 
    {
        const authToken = req.header("authToken");

        if(authToken)
        {
            const data = await jwtVerify(authToken);
            req.user = data.user;
        }

        next();
    } 
    catch (error) 
    {
        return res.status(401).send({ error: "Please authenticate using a valid token" });
    }
};

export const AdminAuthIdValidation = (req: AuthRequest, res: Response, next: NextFunction) => 
{
    const adminID = req.user?._id;

    if (!adminID) 
    {
        return res.status(401).json({ error: "Invalid auth Token!" });
    }

    next();
}
