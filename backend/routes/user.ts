import express, { Request, Response } from 'express';
import { createUser,  findUser, getUser } from '../handler/userHandler';
import { bcryptHash, comparePassword, jwtSign } from '../handler/hashing';
import { changePassword, createUserInterface, loginInterface, UserInterface } from '../interface/requestInterface';
import fetchuser, { AuthRequest } from '../handler/middleware';

const router = express.Router();

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
        const newUser = await createUser({ email: email, name: name, password: secPass }) as UserInterface;

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

// POST method, no login required ,it used to login(verify)
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

// GET method ,login required, it get user data
router.get('/user', fetchuser, async(req:AuthRequest, res:Response) => 
{
    const userId = req.user?.id;

    if(!userId)
    {
        return res.status(401).json({error: "Invalid auth Token!"});
    }

    try
    {
        const foundUser = await getUser(userId) ;

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

router.put('/changePassword', fetchuser, async(req:AuthRequest, res:Response) => 
{
    const {oldPassword, newPassword}:changePassword = req.body;
    let success:boolean = false;
    const userId = req.user?.id;

    if(!userId)
    {
        return res.status(401).json({error: "Invalid auth Token!"});
    }

    try
    {
        
        const hashPassword = await bcryptHash(newPassword);
        success = true;
        res.json({success, message: "Change password successfully!"})
    }
    catch(error)
    {
        console.log(error);
        res.status(500).json({ error: "Internal Server Error!"});
    }
});

module.exports = router;