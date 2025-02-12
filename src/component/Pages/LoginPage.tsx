import { FormEvent, ChangeEvent, useState, useContext } from 'react';

import { Box, Button, Card, CardContent, FormControl, TextField, Typography, Checkbox, FormControlLabel, FormGroup } from '@mui/material';
import { AlertContext } from '../../Context/SnackBarContext';

import { LoginModel } from '../../Model/InputFieldModel';
import { LoginField } from '../../Maps/TextFieldsMaps'

// Model for css syntax
import { PageItemToCenter, PageTitleSyntax } from '../../Maps/FormatSyntaxMaps';

import { ValidateField } from '../../Controller/ValidateController'
import { LoginController } from '../../Controller/UserController/UserPostController';

const LoginPage = () => 
{
    const [credentials, setCredentials] = useState({ email: "", password: "", stayLogin: false });
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [errors, setErrors] = useState({email: "", password: ""});
    const [helperTexts, setHelperText] = useState({email: "", password: ""});

    const alertContext = useContext(AlertContext);

    const handleLogin = async (e: FormEvent) => 
    {
        e.preventDefault();
        const success = await LoginController(credentials.email, credentials.password, credentials.stayLogin);
        setIsSubmitted(true);

        if(alertContext && alertContext.setAlertConfig)
        {
            if (success) 
            {
                alertContext.setAlertConfig({ AlertType: "success", Message: "Login Successfully!", open: true, onClose: () => alertContext.setAlertConfig(null)});
                setTimeout(() => {window.location.href = './'}, 2000);
                return;
            }
            alertContext.setAlertConfig({ AlertType: "error", Message: "Failed to login!", open: true, onClose: () => alertContext.setAlertConfig(null)});
        }
    };
    
    const onChange = (event: ChangeEvent<HTMLInputElement>) => 
    {
        // For login 
        const { name, value, checked, type } = event.target;
        setCredentials(prevState => ({...prevState, [name]: type === 'checkbox' ? checked : value}));

        // For validate
        const { error, helperText } = ValidateField(name, value);
        setHelperText({...helperTexts, [name]: helperText});
        setErrors({...errors, [name]: error});
    };

    return (
        <Box sx={PageItemToCenter}>
            <Card variant='outlined' sx={{ width: 600 }}>
                <CardContent>
                    <Typography sx={PageTitleSyntax}>Login</Typography>
                    {LoginField.map((field, index) => (
                        <FormControl key={index} sx={{ marginBottom: 3, width: '100%' }}>
                            <Typography>{field.label}</Typography>
                            <TextField
                                name={field.name}
                                type={field.type}
                                value={credentials[field.name as keyof LoginModel]}
                                helperText={isSubmitted && helperTexts[field.name as keyof typeof helperTexts]}
                                error={isSubmitted && errors[field.name as keyof typeof errors] != ""}
                                onChange={onChange}
                                size="small"
                                required
                            />
                        </FormControl>
                    ))}
                    <FormGroup>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={credentials.stayLogin}
                                    onChange={onChange}
                                    name="stayLogin"
                                />
                            }
                            label="Remember me in 30 days"
                        />
                    </FormGroup>
                    <Button variant="contained" onClick={handleLogin}>Login</Button>
                </CardContent>
            </Card>
        </Box>
    );
};

export default LoginPage;
