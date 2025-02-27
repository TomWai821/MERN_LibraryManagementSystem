import { ResultInterface } from "../../Model/ResultModel"
import { handleSuccess } from "./UserOtherController";

const contentType:string = 'application/json';
const localhost:string = 'http://localhost:5000/api/user';

const LoginController = async (email:String, password:String, stayLogin:boolean): Promise<any> => 
{
    const user = {email, password};

    try
    {
        const response = await fetch(`${localhost}/login`, 
            {
                method: 'POST',
                headers: { 'content-type': contentType },
                body: JSON.stringify(user)
            }
        );

        if(response.ok)
        {
            const result: ResultInterface = await response.json();
            handleSuccess(result, stayLogin);
            return true;
        }
        else
        {
            return false;
        }
    }
    catch(error)
    {
        return false;
    }
}

const RegisterController = async (email:string, username:string, password:string, birthDay:string, gender:string): Promise<any> => 
{
    const user = {email, username, password, birthDay, gender};

    try
    {
        const response = await fetch(`${localhost}/register`,
            {
                method: 'POST',
                headers: { 'content-type': contentType },
                body: JSON.stringify(user)
            }
        )

        if(response.ok)
        {
            const result: ResultInterface = await response.json();
            handleSuccess(result, false);
            return true;
        }
        else
        {
            return false;
        }
        
    }
    catch(error)
    {
        console.log(error);
        return false;
    }
}

export {LoginController, RegisterController}


    