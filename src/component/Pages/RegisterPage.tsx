import { FormEvent, ChangeEvent, useState, useRef } from 'react';
import { RegisterController } from '../../Controller/UserController/UserController';
import { MenuItem, Button, Card, CardContent, Typography, TextField, Box, FormControl } from '@mui/material'
import { RegisterModel } from '../../Model/InputFieldModel';

const Fields = 
[
    {name:"email", type:"email", label:"Email:"},
    {name:"username", type:"text", label:"Username:"},
    {name:"password", type:"password", label:"Password:"},
    {name:"birthDay", type:"date", label:"Date Of Birth:"}
]

const getCurrentDate = (): string => 
{ 
    const date = new Date(); 
    return date.toISOString().split('T')[0]; 
}

const RegisterPage = () => 
{

    const [Credentials, setCredentials] = useState({email: "", username: "", password: "", birthDay: getCurrentDate(), gender: "Male"});

    const handleRegister = async (event: FormEvent) => 
    {
        event.preventDefault();
        await RegisterController(Credentials.email, Credentials.username, Credentials.password, Credentials.birthDay, Credentials.gender);
    }

    const onChange = (event: ChangeEvent<HTMLInputElement>) => 
    {
        setCredentials({...Credentials, [event.target.name]: event.target.value});
    }

    return(
        <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 5}}>
            <Card variant='outlined' sx={{ width: 600 }}>
                <CardContent>
                    <Typography sx={{ fontSize: 36, marginBottom: 3 }}>Register</Typography>
                
                    {
                        Fields.map((field) =>
                            (
                                <FormControl key={field.label} sx={{ marginBottom: 3, width: '100%'}}>
                                    <Typography>{field.label}</Typography>
                                    <TextField name={field.name} type={field.type} value={Credentials[field.name as keyof RegisterModel]} onChange={onChange} size="small" required/>
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

export default RegisterPage