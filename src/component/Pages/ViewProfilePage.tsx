// React Components
import { ChangeEvent,  FormEvent,  useEffect, useState } from 'react'

// MUI components
import { Box, Button, Card, CardContent, InputLabel, TextField, Typography } from '@mui/material'

// Models
import { ViewProfileModel } from '../../Model/InputFieldModel'
import { getResultInterface } from '../../Model/ResultModel'
// Controllers
import { fetchUserData } from '../../Controller/UserController/UserController'
import { getUserCookie } from '../../Controller/CookieController'
import React from 'react'

const ButtonFormat = {width: '75%', mt: '15px', deleteButtonColor: 'rgb(230, 0, 0)', deleteButtonHoverColor: 'rgb(210, 0, 0)'};
const InputLabelWidth = '120px';

const Fields = 
[
    {name: "email", label: "Email:", type: "email", disable: true}, 
    {name: "gender", label: "Gender:", type: "string", disable: true},
    {name: "username", label: "Username:", type: "string", disable: true}, 
    {name: "newName", label: "New Name:", type: "string", disable: false},
    {name: "role", label: "Role:",  type: "string", disable: true}, 
    {name: "newPassword", label: "New Password:", type: "password", disable: false}
]

const ViewProfilePage = () => 
{
    const [Credentials, setCredentials] = useState<ViewProfileModel>({ email: "", gender: "", username: "",  newName: "", role: "", newPassword: ""});

    

    useEffect(() => {
        const fetchUser = async () => 
        {
            const authToken = getUserCookie("authToken") || sessionStorage.getItem("authToken");

            if (authToken) 
            {
                try 
                {
                    const userData = await fetchUserData(authToken);
                    if (userData) 
                    {
                        updateCredentials(userData);
                    }
                } 
                catch (error) 
                {
                    console.log('Error while fetching user', error);
                }
            }
        };

        fetchUser();
    }, []);

    const updateCredentials = (userData: getResultInterface) =>
    {
        setCredentials
        (
            {
                username: userData.username || "", 
                gender: userData.gender || "",
                role: userData.role || "",
                email: userData.email || "",
                newName: "",
                newPassword: ""
            }
        );
    }

    const onChange = (event: ChangeEvent<HTMLInputElement>) => 
    {
        setCredentials({ ...Credentials, [event.target.name]: event.target.value });
    };

    const onSubmit = (event: FormEvent) => 
    {
        event.preventDefault();
    }

    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 5}}>
            <Card variant='outlined' sx={{ width: '900px' }}>
                <CardContent>
                    <Typography sx={{ fontSize: 36 }}>Profile</Typography>
                    <Box sx={{ padding: '20px', display: 'grid', gap: '10px 50px', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))'}}>
                    {
                        Fields.map((field, index) =>
                        (
                            <React.Fragment key={index}>
                                <TextField 
                                    sx={{ minWidth: '100px',  maxWidth: '500px'}}
                                    name={field.name}
                                    label={field.name}
                                    type={field.type}
                                    value={Credentials[field.name as keyof ViewProfileModel]}
                                    size="small" 
                                    onChange={onChange} 
                                    disabled={field.disable}
                                />
                            </React.Fragment>
                        ))
                    }
                    </Box>

                    <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', mt: ButtonFormat.mt}}>
    
                        <Button variant='contained' sx={{width: ButtonFormat.width, mt: ButtonFormat.mt}} onClick={onSubmit}>Change Data</Button>
                        <Button variant='contained' sx={{width: ButtonFormat.width, mt: ButtonFormat.mt, backgroundColor: ButtonFormat.deleteButtonColor, '&:hover': {backgroundColor: ButtonFormat.deleteButtonHoverColor} }}>Delete Account</Button>
                    </Box>
                </CardContent>
            </Card>
        </Box>
    )
};

export default ViewProfilePage;

