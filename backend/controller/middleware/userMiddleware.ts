import { NextFunction, Response, Request } from "express";
import { AuthRequest, LoginInterface } from "../../model/requestInterface";
import { FindUser, FindUserByID } from "../../schema/user/user";
import { ObjectId } from "mongoose";
import { comparePassword } from "../hashing";
import { UserInterface } from "../../model/userSchemaInterface";

// For user register (not require login)
export const UserRegisterDataValidation = async (req: Request, res: Response, next: NextFunction) => 
{
    const {email, username} = req.body;
    const user = await FindUser({ $or: [{ email }, { username }] });

    if(user)
    {
        if(user.email === email)
        {
            return res.status(400).json({success: false, error: "Email already in use"});
        }

        if(user.username === username)
        {
            return res.status(400).json({success: false, error: "Username already in use"});
        }
    }

    next();
}

// For user login (not require login)
export const UserLoginDataValidation = async (req: AuthRequest, res: Response, next: NextFunction) => 
{
    const { email, password }: LoginInterface = req.body;
    
    const user = await FindUser({ email });
  
    if (!user) 
    {
        return res.status(400).json({ success: false, error: 'Invalid email address' });
    }

    if (user.status === "Banned") 
    {
        return res.status(401).json({ successs: false, error: 'This user was banned' });
    }

    const compare = await comparePassword(password, user.password);

    if (!compare) 
    {
        return res.status(400).json({ error: 'Invalid password' });
    }

    req.user = user;
    next();
}
    
// for found user with used to modify or delete (Require login)
export const FoundUser = async (req: AuthRequest, res:Response, next:NextFunction) => 
{
    const userId = req.params.id as unknown as ObjectId;
    const foundUser = await FindUserByID(userId);
        
    if (!foundUser) 
    {
        return res.status(404).json({ error: "Cannot found this account!" });
    }

    req.foundUser = foundUser as UserInterface;
    next();
}