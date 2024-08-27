import express, {Request, Response} from 'express';
import {UserService} from '../services/user'
import { validationResult, body } from 'express-validator';

const router = express.Router();
const userService = new UserService();

router.post('/createUser',
    [
        body('name','').isLength({min: 3}),
        body('email','Please input valid email!').isEmail(),
        body('password','').isLength({min: 3})
    ], 
    async(request:Request, response:Response) => 
    {
        const errors = validationResult(request);
        let success:boolean = false;
        const {userName, email, password} = request.body;

        if(!errors.isEmpty())
        {
            return response.status(400).json({success, errors});
        }

        try
        {
            let user = await userService.getUseremail(email);

            if(user)
            {
                return response.status(400).json("This user are already exist!");
            }

            user = await userService.createUser(userName, email, password);
            
            const authToken = await userService.encryptUserData(userName);
            success = true;
            response.json({success, authToken});

        }
        catch(error)
        {
            return response.status(500).json("Some error occured");
        }
    }
);

router.post('/login', async(request:Request, response:Response) => 
    {
        const {email, password} = request.body;
        let success:boolean = false;

        try
        {
            let user = await userService.getUseremail(email);

            if(!user)
            {
                return response.status(400).json({success, error:"Invalid credentials!"});
            }

            const comparePassword = await userService.passwordAuth(password , user.password);

            if(!comparePassword)
            {
                return response.status(400).json({success, error:"Invalid credentials!"});
            }
            
            const data = userService.encryptUserData(user.id);
            success = true;
            response.json({success, data});
        }
        catch(error)
        {
            return response.status(500).json("some error occured");
        }
    });