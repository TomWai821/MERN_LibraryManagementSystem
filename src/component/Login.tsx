import { FormEvent, ChangeEvent, useState } from 'react';
import { LoginHandler } from '../Handler/UserHandler';
import InputField from './InputField';
import { Button, FormControl } from '@mui/material';
import '../css/card.css'
import '../css/pages.css'


const Login = () =>
{
    const [Credentials, setCredentials] = useState({email:"", password: ""});

    const handleLogin = async (e: FormEvent) => 
    {
        e.preventDefault();
        LoginHandler(Credentials.email, Credentials.password);
    }

    const onChange = (e: ChangeEvent<HTMLInputElement>) => 
    {
        setCredentials({...Credentials, [e.target.name]: e.target.value});
    }

    return(
        <section id="page"> 
            <FormControl variant="standard" sx={{ minWidth: 500 }}>
                <span id="card-title">Login Page</span>

                    <InputField name="email" 
                        label="Email:" 
                        type="email" 
                        value={Credentials.email} 
                        onChange={onChange}
                        size="small" 
                        required={false} 
                        disabled={false}
                        requireText=""
                    />
                            
                    <InputField name="password" 
                        label="Password:" 
                        type="password" 
                        value={Credentials.password} 
                        onChange={onChange}
                        size="small" 
                        required={false} 
                        disabled={false}
                        requireText=""
                    />

                    <div id="card-input">
                        <Button variant="contained" onClick={handleLogin}>Submit</Button>
                    </div>

            </FormControl>
        </section>
    )
}

export default Login