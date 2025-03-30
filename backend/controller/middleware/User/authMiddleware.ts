import { NextFunction, Response } from "express";
import { jwtVerify } from "../../hashing";
import { AuthRequest } from "../../../model/requestInterface";

export const FetchUserFromHeader = async (req: AuthRequest, res: Response, next: NextFunction) => 
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
        return res.status(401).send({ success: false, error: "Please authenticate using a valid token" });
    }
};

export const AuthIdValidation = (req: AuthRequest, res: Response, next: NextFunction) => 
{
    const userId = req.user?._id;

    if (!userId) 
    {
        return res.status(401).json({ success: false, error: "Invalid auth Token!" });
    }

    next();
}
