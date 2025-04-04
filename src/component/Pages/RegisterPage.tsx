import { FormEvent, ChangeEvent, useState, useContext } from 'react';

import { MenuItem, Button, Card, CardContent, Typography, TextField, Box, FormControl } from '@mui/material'

// Another Useful Function
import { RegisterController } from '../../Controller/UserController/UserPostController';
import { DataValidateField } from '../../Controller/ValidateController'
import { ChangePage, GetCurrentDate } from '../../Controller/OtherController';

// Context
import { AlertContext } from '../../Context/AlertContext';

// Models
import { RegisterModel } from '../../Model/InputFieldModel';

// Data(CSS Syntax and dropdown option)
import { PageItemToCenter, PageTitleSyntax } from '../../ArraysAndObjects/FormatSyntaxObjects';
import { RegisterField } from '../../ArraysAndObjects/TextFieldsArrays';

const RegisterPage = () => 
{
    const [Credentials, setCredentials] = useState({email: "", username: "", password: "", birthDay: GetCurrentDate("String") as string, gender: "Male"});
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [errors, setErrors] = useState({email: "", username: "", password: "", birthDay: ""});
    const [helperTexts, setHelperText] = useState({email: "", username: "", password: "", birthDay: ""});

    const alertContext = useContext(AlertContext);

    const handleDataValidate = async (event: FormEvent) => 
    {
        // Perform validation for all fields
        let validationPassed = true;
        const newErrors = { ...errors };
        const newHelperTexts = { ...helperTexts };
        setIsSubmitted(true);

        Object.keys(Credentials).forEach((field) => 
        {
            const { helperText, error, success } = DataValidateField(field, Credentials[field as keyof RegisterModel]);
            newHelperTexts[field as keyof typeof newHelperTexts] = helperText;
            newErrors[field as keyof typeof newErrors] = error;

            success ? handleRegister(event) : validationPassed = false;
        });

        setHelperText(newHelperTexts);
        setErrors(newErrors);
    }

    const handleRegister = async (event: FormEvent) => 
    {
        event.preventDefault();
        setIsSubmitted(true);
    
        const response: boolean = await RegisterController( 
            "RegisterPanel", Credentials.username, Credentials.email, Credentials.password, 
            "User", Credentials.gender, Credentials.birthDay
        );
    
        if (alertContext && alertContext.setAlertConfig) 
        {
            if (response) 
            {
                alertContext.setAlertConfig({ AlertType: "success", Message: "Registration successful! Redirecting...", open: true, onClose: () => alertContext.setAlertConfig(null) });
                setTimeout(() => { ChangePage("/"); }, 2000);
            } 
            else 
            {
                alertContext.setAlertConfig({ AlertType: "error", Message: "Failed to register! Please try again.", open: true, onClose: () => alertContext.setAlertConfig(null) });
            }
        }
    };

    const onChange = (event: ChangeEvent<HTMLInputElement>) => 
    {
        const {name, value} = event.target;
        setCredentials({...Credentials, [name]: value});
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
                                        error={isSubmitted && errors[field.name as keyof typeof errors] !== ""} 
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

                    <Button variant='contained' onClick={handleDataValidate}>Register</Button>
                </CardContent>
            </Card>
        </Box>
    )
}

export default RegisterPage
