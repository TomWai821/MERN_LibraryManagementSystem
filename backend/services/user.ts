import { User } from "../schema/user";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const jwt_secret:string = 'Wh@t@ver'; 

export class UserService
{
    public async getUseremail(email:string)
    {
        return User.findOne({email});
    }

    public async createUser(userName:string, email:string, password:string)
    {
        const salt:string = bcrypt.gensalt(10);
        const secPass:string = bcrypt.hash(password, salt);

        const user = new User({userName, email, secPass});
        return user;
    }

    public async passwordAuth(userPassword:string, comparedPassword:string)
    {
        return bcrypt.compare(userPassword, comparedPassword);
    }

    public async encryptUserData(userName:string)
    {
        const data = 
        {
            user:
            {
                userName: userName
            }
        }
        return jwt.sign(data, jwt_secret);
    }
}
