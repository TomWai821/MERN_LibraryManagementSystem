import { Request, Response } from 'express';
import { UserMethod, DataType } from '../enum/enum'
import User from '../schema/user';
import { CreateUserInterface, LoginInterface, UserInterface, ChangeDataInterface } from '../model/requestInterface';
import { jwtSign, bcryptHash, comparePassword } from './hashing'
import { AuthRequest } from './middleware';

export const UserRegister = async(req: Request, res: Response) =>
{
    const { email, username, password, gender, birthDay, role, status}: CreateUserInterface = req.body;
    let success = false;

    try
    {
        const userByEmail = await UserUtils('find', { email }) as UserInterface;
        const userByName = await UserUtils('find', { username }) as UserInterface; 

        if (userByEmail || userByName) 
        { 
            return res.status(400).json({ error: 'User already exists' }); 
        } 

        const hashedPassword = await bcryptHash(password); 

        const newUser = await UserUtils('create', 
            { 
                email: email, 
                username: username, 
                password: hashedPassword, 
                gender: gender, 
                birthDay: birthDay, 
                role: role, 
                status: status
            }
        ) as UserInterface; 
        
        const data = { user: { _id: newUser._id } }; 
        const authToken = await jwtSign(data); 
        success = true; 
        res.json({ success, authToken })
    }
    catch (error) 
    { 
        console.error(error); 
        res.status(500).json({ success, error: 'Internal Server Error!' });
    }
}

export const UserLogin = async(req: Request, res:Response) =>
{
    const {email, password}: LoginInterface = req.body;
    let success = false;
    try
    {
        const user = await UserUtils("find", {email}) as UserInterface;

        if(!user)
        {
            return res.status(400).json({ error: email + "Invalid Credentials" });
        }

        if(user.status == "Banned")
        {
            return res.status(401).json( { error: "This user was banned" });
        }

        const compare = await comparePassword(password, user.password);

        if(!compare)
        {
            return res.status(400).json({ error: " compare Invalid Credentials" });
        }

        const data = { user:{ _id:user._id } };
        const name = user.username;
        const role = user.role;

        const authToken:string = await jwtSign(data);
        success = true;
        res.json({success, name, role, authToken});
    }
    catch(error)
    {
        res.status(500).json({success, error: 'Internal Server Error!'});
    }
}

export const GetUserData = async(req: AuthRequest, res:Response) => 
{
    let userId = "";

    if(req.user?._id != null)
    {
        userId = req.user?._id;
    
        if(!userId)
        {
            return res.status(401).json({error: "Invalid auth Token!"});
        }
    }
    
    try
    {
        const foundUser = await UserUtils("get", userId) as UserInterface ;
    
        if(!foundUser)
        {
            return res.status(401).json({error: "Invalid auth Token!"});
        }
    
        res.send(foundUser);
    }
    catch(error)
    {
        console.log(error);
        res.status(500).json({ error: "Internal Server Error!" });
    }
}

export const UserChangeData = async(req: AuthRequest, res:Response) => 
{
    const {oldUsername, newUsername, oldPassword, newPassword}:ChangeDataInterface = req.body;
    let success = false;
    const userId = req.user?._id;

    if(!userId)
    {
        return res.status(401).json({error: "Invalid auth Token!"});
    }

    try
    {
        const foundUser = await UserUtils("get", {userId}) as UserInterface;
        
        if(!foundUser)
        {
            return res.status(401).json({error : "Cannot found this account!"});
        }

        if(oldPassword && newPassword)
        {
            const compare = await comparePassword(oldPassword, foundUser.password);

            if(!compare)
            {
                return res.status(401).json({error : "Password Incorrect!"});
            }
            const hashPassword = await bcryptHash(newPassword);
            await changeData("password", userId, hashPassword);
        }

        if(oldUsername && newUsername)
        {
            await changeData("username", userId, newUsername);
        }

        success = true;
        res.json({success, message: "Change data successfully!"});

    }
    catch(error)
    {
        console.log(error);
        res.status(500).json({ error: "Internal Server Error!"});
    }
}

export const UserUtils = async (method:string, data: string | Record<string, any>) => 
{
    try
    { 
        switch(method)
        {
            case UserMethod.FIND:
                if (typeof data === 'string') 
                {
                    throw new Error("Invalid data type for findOne");
                }
                return await User.findOne(data);
            
            case UserMethod.CREATE:
                return await User.create(data);
            
            case UserMethod.GET: 
                if(JSON.stringify(data) === '{}')
                {
                    return await User.find({});
                }
                return await User.findById(data).select("-createdAt -password");       

            default:
                return null;
        }
    }
    catch(error)
    {
        return error;
    } 
}

export const changeData = async(dataType:string, userId:string, newData:string) =>
{
    switch(dataType)
    {
        case DataType.PASSWORD:
            return User.findByIdAndUpdate(userId, {dataType:newData});
        
        case DataType.NAME:
            return User.findByIdAndUpdate(userId, {name:newData});
        
        default:
            return null;
    }
}