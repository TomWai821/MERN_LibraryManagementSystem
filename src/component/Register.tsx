import { FormEvent, ChangeEvent, useState } from 'react';
import { RegisterHandler } from '../Handler/UserHandler';
import { MenuItem, Button, Card, CardContent, Typography, TextField, Box, FormControl } from '@mui/material'

interface Credentials 
{ 
    email: string; 
    name: string; 
    password: string; 
    birthDay: string;
}

const Register = () => 
{
    const [Credentials, setCredentials] = useState({email: "", name: "", password: "", birthDay: "", gender: "Male"});

    const Fields = 
    [
        {name:"email", type:"email", label:"Email:"},
        {name:"name", type:"text", label:"Username:"},
        {name:"password", type:"password", label:"Password:"},
        {name:"birthDay", type:"date", label:"Date Of Birth:"}
    ]

    const handleRegister = async (e: FormEvent) => 
    {
        e.preventDefault();
        await RegisterHandler(Credentials.email, Credentials.name, Credentials.password, Credentials.birthDay, Credentials.gender);
    }

    const onChange = (e: ChangeEvent<HTMLInputElement>) => 
    {
        setCredentials({...Credentials, [e.target.name]: e.target.value});
    }

    return(
        <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 5}}>
            <Card variant='outlined' sx={{ width: 600 }}>
                <CardContent>
                    <Typography sx={{ fontSize: 36, marginBottom: 3 }}>Register</Typography>

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

                    <FormControl sx={{ marginBottom: 5, width: '100%' }}>
                        <Typography>Gender</Typography>
                        <TextField name="gender" value={Credentials.gender} size="small" onChange={onChange} select required>
                            <MenuItem value={"Male"}>Male</MenuItem>
                            <MenuItem value={"Female"}>Female</MenuItem>
                        </TextField>
                    </FormControl>

                    <Button variant='contained' onClick={handleRegister}>Register</Button>
                </CardContent>
            </Card>
        </Box>
    )
}

export default Register