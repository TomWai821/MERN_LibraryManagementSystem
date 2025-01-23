import { FormEvent, ChangeEvent, useState } from 'react';
import { LoginController } from '../../Controller/UserController/UserController';
import { LoginModel } from '../../Model/InputFieldModel';
import { Box, Button, Card, CardContent, FormControl, TextField, Typography, Checkbox, FormControlLabel, FormGroup } from '@mui/material';
import SendAlert from '../Alert';
import { AlertInterface } from '../../Model/AlertModel';

const LoginPage = () => {
    const [credentials, setCredentials] = useState({ email: "", password: "", stayLogin: false });
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [alertConfig, setAlertConfig] = useState<AlertInterface | null>(null);

    const fields = [
        { name: "email", type: "email", label: "Email" },
        { name: "password", type: "password", label: "Password" }
    ];

    const handleLogin = async (e: FormEvent) => {
        e.preventDefault();
        const success = await LoginController(credentials.email, credentials.password, 30);
        setIsSubmitted(true);

        if (success) 
        {
            setAlertConfig({ AlertType: "success", Message: "Login Successfully!", Timer: 2000 });
        }
    };

    const onChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value, checked, type } = event.target;
        setCredentials(prevState => ({
            ...prevState,
            [name]: type === 'checkbox' ? checked : value
        }));
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
                                helperText={isSubmitted && !credentials[field.name as keyof LoginModel] ? `${field.label} is required` : ""}
                                error={isSubmitted && !credentials[field.name as keyof LoginModel]}
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
                            label="Stay Login in 30 days"
                        />
                    </FormGroup>
                    <Button variant="contained" onClick={handleLogin}>Login</Button>
                </CardContent>
            </Card>
            {alertConfig && <SendAlert {...alertConfig} />}
        </Box>
    );
};

export default LoginPage;
