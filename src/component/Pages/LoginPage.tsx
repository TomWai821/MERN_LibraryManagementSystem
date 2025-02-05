import { FormEvent, ChangeEvent, useState, useContext } from 'react';
import { LoginController } from '../../Controller/UserController/UserController';
import { LoginModel } from '../../Model/InputFieldModel';
import { Box, Button, Card, CardContent, FormControl, TextField, Typography, Checkbox, FormControlLabel, FormGroup } from '@mui/material';
import { AlertContext } from '../../Context/AlertContext';

const LoginPage = () => 
{
    const [credentials, setCredentials] = useState({ email: "", password: "", stayLogin: false });
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [errors, setErrors] = useState({email: "", password: ""});
    const [helperTexts, setHelperText] = useState({email: "", password: ""});

    const alertContext = useContext(AlertContext);

    const fields = [
        { name: "email", type: "email", label: "Email" },
        { name: "password", type: "password", label: "Password" }
    ];

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

    const validateField = (name:string, value:string) => 
    {
        let error = "";
        let helperText  = "";
        if(!value)
        {
            error = `{$name} is required`;
            helperText = `{$name} cannot be empty`;
        }
        else
        {
            switch(name)
            {
                case "email":
                    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    if (!emailRegex.test(value)) 
                    {
                        error = "Invalid email address";
                        helperText = "Please enter a valid email address";
                    }
                    break;
                
                case "password":
                    if(value.length < 6)
                    {
                        error = "Password must be at least 6 characters long";
                        helperText = "Password must be at least 6 characters longs";
                    }
                    break;

                default:
                    break;
            }
        }
        
        return {error, helperText};
    }
    
    const onChange = (event: ChangeEvent<HTMLInputElement>) => 
    {
        // For login 
        const { name, value, checked, type } = event.target;
        setCredentials(prevState => ({...prevState, [name]: type === 'checkbox' ? checked : value}));

        // For validate
        const { error, helperText } = validateField(name, value);
        setHelperText({...helperTexts, [name]: helperText});
        setErrors({...errors, [name]: error});
    };

    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 5 }}>
            <Card variant='outlined' sx={{ width: 600 }}>
                <CardContent>
                    <Typography sx={{ fontSize: 36, marginBottom: 3 }}>Login</Typography>
                    {fields.map((field, index) => (
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
