import express, { NextFunction, Request, Response } from 'express';
import { authRequest, createUser, fetchuser, findUser, findUserById } from '../handler/userHandler';
import {  bcryptHash, comparePassword, jwtSign } from '../handler/hashing';
import { createUserInterface, loginInterface, user, } from '../interface/requestInterface';

const router = express.Router();

router.post('/createUser', async (req: Request, res: Response) => 
{
    const { email, name, password }: createUserInterface = req.body;
    let success: boolean = false;

    try 
    {
        const user = await findUser({ email: email }) as user | null ;

        if(user)
        {
            return res.status(400).json({ error: 'User already exists' });
        }

        const secPass = await bcryptHash(password);
        const newUser = await createUser({ email: email, name: name, password: secPass }) as user;

        const data = { user: { id: newUser._id }};
        const authToken:string = await jwtSign(data);

        success = true;
        res.json({ success, authToken });
    } 
    catch (error) 
    {
        console.error(error);
        res.status(500).json({ success, error: 'Internal Server Error!' });
    }
});

router.post('/login', async (req:Request, res:Response) => 
{
    const {email, password}:loginInterface = req.body; 
    let success:boolean = false;

    try
    {
        const user = await findUser({email}) as user | null;

        if(!user)
        {
            return res.status(400).json({ error: "Invalid Credentials" });
        }

        const compare = await comparePassword(password, user.password);

        if(!compare)
        {
            return res.status(400).json({ error: "Invalid Credentials" });
        }

        const data = { user:{ user:user._id } };

        const authToken:string = await jwtSign(data);
        success = true;
        res.json({success, authToken});
    }
    catch(error)
    {
        console.log(error)
        res.status(500).json({success, error: 'Internal Server Error!'});
    }
});


module.exports = router;