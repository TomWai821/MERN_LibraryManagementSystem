import { FormEvent, ChangeEvent, useState, useContext } from 'react';

import { MenuItem, Button, Card, CardContent, Typography, TextField, Box, FormControl } from '@mui/material'

import { RegisterController } from '../../Controller/UserController/UserPostController';
import { ValidateField } from '../../Controller/ValidateController'

import { RegisterField } from '../../Maps/TextFieldsMaps'
import { RegisterModel } from '../../Model/InputFieldModel';

import { AlertContext } from '../../Context/AlertContext';
import { PageItemToCenter, PageTitleSyntax } from '../../Maps/FormatSyntaxMaps';
import { GetCurrentDate } from '../../Controller/OtherController';

const RegisterPage = () => 
{
    const [Credentials, setCredentials] = useState({email: "", username: "", password: "", birthDay: GetCurrentDate(), gender: "Male"});
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [errors, setErrors] = useState({email: "", username: "", password: ""});
    const [helperTexts, setHelperText] = useState({email: "", username: "", password: ""});

    const handleRegister = async (event: FormEvent) => 
    {
        event.preventDefault();
        setIsSubmitted(true);
        await RegisterController(Credentials.email, Credentials.username, Credentials.password, Credentials.birthDay, Credentials.gender);
    }

    const onChange = (event: ChangeEvent<HTMLInputElement>) => 
    {
        const {name, value} = event.target;
        setCredentials({...Credentials, [name]: value});

        const {helperText, error} = ValidateField(name, value);
        setHelperText({...helperTexts, [name]: helperText});
        setErrors({...errors, [name]: error});
    }

    return(
        <Box sx={PageItemToCenter}>
            <Card variant='outlined' sx={{ width: 600 }}>
                <CardContent>
                    <Typography sx={PageTitleSyntax}>Register</Typography>
                    {
                        RegisterField.map((field, index) =>
                            (
                                <FormControl key={index} sx={{ marginBottom: 3, width: '100%'}}>
                                    <Typography>{field.label}</Typography>
                                    <TextField 
                                        name={field.name} 
                                        type={field.type} 
                                        value={Credentials[field.name as keyof RegisterModel]}
                                        helperText={isSubmitted && helperTexts[field.name as keyof typeof helperTexts]}
                                        error={isSubmitted && errors[field.name as keyof typeof errors] != ""} 
                                        onChange={onChange} 
                                        size="small" 
                                        required/>
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
