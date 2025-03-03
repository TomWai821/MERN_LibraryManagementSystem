import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { AuthRequest } from '../model/requestInterface';

const JWT_SECRET:string = "Wh@t@ver"

const bcryptHash = async(password:string) => 
{
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
}

const comparePassword = async(inputPassword:string, comparePassword:string) =>
{
    return bcrypt.compare(inputPassword, comparePassword);
}

const jwtSign = async(UserID:Record<string, any>) => 
{
    return jwt.sign(UserID, JWT_SECRET);
}

const jwtVerify = async(token:string) =>
{
    return jwt.verify(token, JWT_SECRET) as AuthRequest;
}

export {bcryptHash, comparePassword, jwtSign, jwtVerify}