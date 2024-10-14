import express, { Request, Response } from 'express';
import { UserUtils, changeData } from '../handler/userHandler';
import { bcryptHash, comparePassword, jwtSign } from '../handler/hashing';
import { changeDataInterface, createUserInterface, loginInterface, UserInterface } from '../interface/requestInterface';
import { fetchuser, AuthRequest } from '../handler/middleware';

const router = express.Router();

// POST method, it used to create a user in mongoDB
router.post('/register',async (req: Request, res: Response) => 
{
    const { email, name, password, gender, birthDay }: createUserInterface = req.body;
    let success: boolean = false;

    try 
    {
        const user = await UserUtils("find", {email}) as UserInterface;

        if(user)
        {
            return res.status(400).json({ error: 'User already exists' });
        }

        const secPass = await bcryptHash(password);
        const newUser = await UserUtils("create", { email: email, name: name, password: secPass, gender:gender, birthDay:birthDay, role: "User", banned: false }) as UserInterface;

        const data = { user: { _id: newUser._id }};
        const authToken:string = await jwtSign(data);

        success = true;
        res.json({ success, name , authToken });
    } 
    catch (error) 
    {
        console.error(error);
        res.status(500).json({ success, error: 'Internal Server Error!' });
    }
});

// POST method, no login required, it used to login(verify)
router.post('/login', async (req:Request, res:Response) => 
{
    const {email, password}: loginInterface = req.body; 
    let success:boolean = false;

    try
    {
        const user = await UserUtils("find", {email}) as UserInterface;

        if(!user)
        {
            return res.status(400).json({ error: email + "Invalid Credentials" });
        }

        if(user.banned == true)
        {
            return res.status(401).json( { error: "This user was banned" });
        }

        const compare = await comparePassword(password, user.password);

        if(!compare)
        {
            return res.status(400).json({ error: " compare Invalid Credentials" });
        }

        const data = { user:{ _id:user._id } };
        const name = user.name;

        const authToken:string = await jwtSign(data);
        success = true;
        res.json({success, name , authToken});
    }
    catch(error)
    {
        res.status(500).json({success, error: 'Internal Server Error!'});
    }
});

// GET method, login required, it get user data
router.get('/user', fetchuser, async(req:AuthRequest, res:Response) => 
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
});

// PUT method, login required, which used to change user password
router.put('/changePassword/id=:id', fetchuser, async(req:AuthRequest, res:Response) => 
{
    const {oldUsername, newUsername, oldPassword, newPassword}:changeDataInterface = req.body;
    let success:boolean = false;
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

        if(oldPassword != null && newPassword != null)
        {
            const compare = await comparePassword(oldPassword, foundUser.password);

            if(!compare)
            {
                return res.status(401).json({error : "Password Incorrect!"});
            }
            const hashPassword = await bcryptHash(newPassword);
            changeData("password", userId, hashPassword);
        }

        success = true;
        res.json({success, message: "Change data successfully!"});

    }
    catch(error)
    {
        console.log(error);
        res.status(500).json({ error: "Internal Server Error!"});
    }
});

module.exports = router;