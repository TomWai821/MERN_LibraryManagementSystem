import express, { Request, Response } from 'express';
import { createUser, findUser } from '../handler/user';
import { bcryptHash, jwtSign } from '../handler/validation';
import { createUserInterface, user } from '../interface/requestInterface';

const router = express.Router();

router.post('/createUser', async (req: Request, res: Response) => 
{
    const { email, name, password }: createUserInterface = req.body;
    let success: boolean = false;

    try 
    {
        const user = await findUser({ email: email }) as user | null ;

        if(!user)
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
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;