import { FormEvent, ChangeEvent, useState } from 'react';
import { LoginHandler } from '../Handler/UserHandler';
import { Box, Button, Card, CardContent, FormControl, TextField, Typography } from '@mui/material';

interface Credentials
{
    email:string,
    password:string
}

const Login = () =>
{
    const [Credentials, setCredentials] = useState({email:"", password: ""});

    const Fields = 
    [
        {name:"email", type:"email", label:"Email"},
        {name:"password", type:"email", label:"Password"}
    ];

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
        <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 5}}>
            <Card variant='outlined' sx={{ width: 600 }}>
                <CardContent>
                    <Typography sx={{ fontSize: 36, marginBottom: 3 }}>Login</Typography>

                    {
                        Fields.map((field) =>
                            (
                                <FormControl sx={{ marginBottom: 3, width: '100%'}}>
                                    <Typography>{field.label}</Typography>
                                    <TextField name={field.name} type={field.type} value={Credentials[field.name as keyof Credentials]} onChange={onChange} size="small" required/>
                                </FormControl>
                            )
                        )
                    }

                    <Button variant="contained" onClick={handleLogin}>Login</Button>

                </CardContent>
            </Card>        
        </Box>
    )
}

export default Login