import { Request, Response } from 'express';
import { CreateUserInterface, LoginInterface, ChangeDataInterface } from '../model/requestInterface';
import { jwtSign, bcryptHash, comparePassword } from './hashing'
import UserService from '../schema/user';
import { AuthRequest } from './middleware';
import { UserInterface } from '../model/dbInterface';

export const UserRegister = async(req: Request, res: Response) =>
{
    const { email, username, password, gender, birthDay, role, status }: CreateUserInterface = req.body;
    let success = false;

    try
    {
        const userByEmail = await UserService.FindUser({email});

        if(userByEmail)
        {
            return res.status(400).json({success, error: "Email already in use"});
        }

        const userByName = await UserService.FindUser({username});

        if(userByName)
        {
            return res.status(400).json({success, error: "username already in use"});
        }
        
        // Hash password with bcrypt after validate email and username
        const hashedPassword = await bcryptHash(password); 

        // Create a new user after hashing the password
        const newUser = await UserService.CreateUser({ email, username, password: hashedPassword, gender, birthDay, role, status});
        
        // Get user id after create the user and Transfer user id as authToken with jsonWebToken
        const data = { user: { _id: newUser._id } }; 
        const authToken = await jwtSign(data); 
        success = true; 

        res.json({ success, authToken })
    }
    catch (error) 
    { 
        res.status(500).json({ success, error: 'Internal Server Error!' });
    }
}


export const UserLogin = async (req: Request, res: Response) =>
{
    const { email, password }: LoginInterface = req.body;
    let success = false;
    
    try 
    {
      const user = await UserService.FindUser({ email });
  
        if (!user) 
        {
            return res.status(400).json({ error: 'Invalid email address' });
        }
  
        if (user.status === 'Banned') 
        {
            return res.status(401).json({ error: 'This user was banned' });
        }
  
        const compare = await comparePassword(password, user.password);
  
        if (!compare) 
        {
            return res.status(400).json({ error: 'Invalid password' });
        }
  
        const data = { user: { _id: user._id } };
        const name = user.username;
        const role = user.role;
    
        const authToken: string = await jwtSign(data);
        success = true;
        res.json({ success, name, role, authToken });
    } 
    catch (error) 
    {
        res.status(500).json({ success, error: 'Internal Server Error!' });
    }
  };

export const GetUserData = async(req: AuthRequest, res:Response) => 
{
    let success = false;
    const userId = req.user?._id;
    const {username, email, status, role, gender} = req.body;
    
    try
    {
        let foundUser : UserInterface | UserInterface[] | null;

        if(userId)
        {
            foundUser = await UserService.FindUserByID(userId) as UserInterface;

            if(!foundUser)
            {
                return res.status(401).json({error: "Invalid auth Token!"});
            }
        }
        else
        {
            foundUser = await UserService.GetUser();
        }
        
    
        success = true;
        res.send({success, foundUser});
    }
    catch(error)
    {
        res.status(500).json({ error: "Internal Server Error!" });
    }
}

export const ChangeUserData = async(req: AuthRequest, res:Response) => 
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
        const foundUser = await UserService.FindUserByID(userId);
        
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
            await UserService.FindUserByIDAndUpdate(userId, {password: hashPassword});
        }

        if(oldUsername && newUsername)
        {
            await UserService.FindUserByIDAndUpdate(userId, {username: newUsername});
        }

        success = true;
        res.json({success, message: "Change data successfully!"});

    }
    catch(error)
    {
        res.status(500).json({ error: "Internal Server Error!"});
    }
}