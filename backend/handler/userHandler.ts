import User from '../schema/user';
import { Request, Response, NextFunction } from 'express';
import { jwtVerify } from './hashing';

export interface authRequest extends Request 
{
    user: 
    { 
        _id: string; 
    };
}

export const findUser = async (email:Record<string, any>) => 
{
    try
    { 
        return await User.findOne(email);
    }
    catch(error)
    {
        return error;
    } 
}

export const createUser = async (user: Record<string, any>) => 
{ 
    try
    {
        return await User.create(user);
    }
    catch(error)
    {
        return error;
    }
};

export const fetchuser = async (req: authRequest, res: Response, next: NextFunction) => 
{
    const token = req.header('auth-token');

    if (!token) 
    {
        res.status(401).send({ error: "Please authenticate using a valid token" });
        return;
    }
  
    try 
    {
        const data = await jwtVerify(token);
        req.user = data.user;
        next();
    } 
    catch (error) 
    {
        res.status(401).send({ error: "Please authenticate using a valid token" });
    }
};

export const findUserById = async (id:string) =>
{
    return await User.findById(id).select("-password");
}
