import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const JWT_SECERT = "Wh@t@ver";

export const bcryptHash = async(password:string) => 
{
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
}

export const comparePassword = async(inputPassword:string, comparePassword:string) =>
{
    return bcrypt.compare(inputPassword, comparePassword);
}

export const jwtSign = async(UserID:Record<string, any>) => 
{
    return jwt.sign(UserID, JWT_SECERT);
}
