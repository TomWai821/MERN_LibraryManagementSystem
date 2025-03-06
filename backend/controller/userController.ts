import { Request, Response } from 'express';
import { AuthRequest, CreateUserInterface } from '../model/requestInterface';
import { jwtSign, bcryptHash } from './hashing'
import { UserInterface } from '../model/userSchemaInterface';
import { CreateUser, FindUserByIDAndDelete, FindUserByIDAndUpdate } from '../schema/user/user';

export const UserRegister = async(req: Request, res: Response) =>
{
    const { email, username, password, gender, birthDay, role, status, avatarUrl }: CreateUserInterface = req.body;
    let success = false;

    try
    {   
        // Hash password with bcrypt after validate email and username
        const hashedPassword = await bcryptHash(password); 
    
        // Create a new user after hashing the password
        const newUser = await CreateUser({ email, username, password: hashedPassword, gender, role, status, birthDay, avatarUrl});

        if(!newUser)
        {
            return res.status(400).json({success, error: "Failed to create User"});
        }
        
        // Get user id after create the user and Transfer user id as authToken with jsonWebToken
        const data = { user: { _id: newUser?._id } }; 
        const authToken = await jwtSign(data); 
        success = true; 
    
        res.json({ success, message: "Register successfully!", data:{authToken, username, status: newUser.status, role: newUser.role, avatarUrl: avatarUrl} })
    }
    catch (error) 
    { 
        res.status(500).json({ success, error: 'Internal Server Error!' });
    }
}

export const UserLogin = async (req: AuthRequest, res: Response) =>
{
    const user = req.user as UserInterface;
    let success = false;
    
    try 
    {
        const data = { user: { _id: user._id } };
        const username = user.username;
        const role = user.role;
        const status = user.status;
        const avatarUrl = user.avatarUrl;
    
        const authToken: string = await jwtSign(data);
        success = true;
        res.json({ success, message: "Login Successfully!" , data:{username, role, authToken, status, avatarUrl} });
    } 
    catch (error) 
    {
        res.status(500).json({ success, error: 'Internal Server Error!' });
    }
};

export const GetUserData = async (req: AuthRequest, res: Response) =>
{
    try 
    {
        const foundUser = req.foundUser;
        res.send({ success: true, foundUser });
    } 
    catch (error) 
    {
        res.status(500).json({ success: false, error: "Internal Server Error!" });
    }
};

export const ModifyUserData = async (req: AuthRequest, res: Response) => 
{
    const foundUser = req.foundUser as UserInterface;
    const updateData = req.updateData as Record<string, any>;
    let success = false;

    try 
    {
        const modifyData = await FindUserByIDAndUpdate(foundUser._id, updateData); 

        if(!modifyData)
        {
            return res.json({success, message: "Fail to update Data!"})
        }

        success = true;
        res.json({ success, message: "Data updated successfully!" });
    } 
    catch (error) 
    {
        res.status(500).json({ success, error: "Internal Server Error!" });
    }
};

export const DeleteUser = async (req: AuthRequest, res: Response) => 
{
    const foundUser = req.foundUser as UserInterface;
    let success = false;

    try 
    {
        const deleteUser = await FindUserByIDAndDelete(foundUser._id);

        if(!deleteUser)
        {
            return res.status(401).json({ error: "Failed to delete user!", userID: foundUser._id });
        }

        success = true;
        res.json({ success, message: "Delete user successfully!" });
    }
    catch(error)
    {
        res.status(500).json({ success, error: "Internal Server Error!" });
    }
}