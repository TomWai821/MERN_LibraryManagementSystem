import { FormEvent, ChangeEvent, useState } from 'react';
import { LoginHandler } from '../Handler/UserHandler';
import { Button, FormControl, TextField } from '@mui/material';
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

                    <div id="card-input">
                        <label htmlFor="email" id="card-label">Email:</label>
                        <TextField type="email" name="email" value={Credentials.email} onChange={onChange} size="small" required/>
                    </div>
                            
                    <div id="card-input">
                        <label htmlFor="password" id="card-label">Password:</label>
                        <TextField type="password" name="password" value={Credentials.password} onChange={onChange} size="small" required/>
                    </div>

                    <div id="card-input">
                        <Button variant="contained" onClick={handleLogin}>Submit</Button>
                    </div>

            </FormControl>
        </section>
    )
}

export default Login