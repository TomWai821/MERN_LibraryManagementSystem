import express, { Request, Response } from 'express';
import { createUser,  findUser, getUser, updatePassword } from '../handler/userHandler';
import { bcryptHash, comparePassword, jwtSign } from '../handler/hashing';
import { changePassword, createUserInterface, loginInterface, UserInterface } from '../interface/requestInterface';
import { fetchuser, AuthRequest } from '../handler/middleware';

const router = express.Router();

// POST method, it used to create a user in mongoDB
router.post('/register', async (req: Request, res: Response) => 
{
    const { email, name, password }: createUserInterface = req.body;
    let success: boolean = false;

    try 
    {
        const user = await findUser({ email: email }) as UserInterface | null ;

        if(user)
        {
            return res.status(400).json({ error: 'User already exists' });
        }

        const secPass = await bcryptHash(password);
        const newUser = await createUser({ email: email, name: name, password: secPass, role: "User", banned: false }) as UserInterface;

        const data = { user: { _id: newUser._id }};
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

// POST method, no login required, it used to login(verify)
router.post('/login', async (req:Request, res:Response) => 
{
    const {email, password}:loginInterface = req.body; 
    let success:boolean = false;

    try
    {
        const user = await findUser({email}) as UserInterface | null;

        if(!user)
        {
            return res.status(400).json({ error: "Invalid Credentials" });
        }

        if(user.banned == true)
        {
            return res.status(401).json( { error: "This user was banned" });
        }

        const compare = await comparePassword(password, user.password);

        if(!compare)
        {
            return res.status(400).json({ error: "Invalid Credentials" });
        }

        const data = { user:{ _id:user._id } };

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

// GET method, login required, it get user data
router.get('/user', fetchuser, async(req:AuthRequest, res:Response) => 
{
    let userId = "{}";
     
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
        const foundUser = await getUser(userId) as  UserInterface | null ;

        if(!foundUser)
        {
            return res.status(401).json({error: "Invalid auth Token!"});
        }

        res.send({foundUser});
    }
    catch(error)
    {
        console.log(error);
        res.status(500).json({ error: "Internal Server Error!" });
    }
});

// PUT method, login required, which used to change user password
router.put('/changePassword/:id', fetchuser, async(req:AuthRequest, res:Response) => 
{
    const {oldPassword, newPassword}:changePassword = req.body;
    let success:boolean = false;
    const userId = req.user?._id;

    if(!userId)
    {
        return res.status(401).json({error: "Invalid auth Token!"});
    }

    try
    {
        const foundUser = await getUser(userId) as UserInterface;
        
        if(!foundUser)
        {
            return res.status(401).json({error : "Cannot found this account!"});
        }

        const compare = await comparePassword(oldPassword, foundUser.password);

        if(!compare)
        {
            return res.status(401).json({error : "Password Incorrect!"});
        }

        const hashPassword = await bcryptHash(newPassword);
        updatePassword(userId, hashPassword);
        success = true;
        res.json({success, message: "Change password successfully!"});

    }
    catch(error)
    {
        console.log(error);
        res.status(500).json({ error: "Internal Server Error!"});
    }
});

module.exports = router;