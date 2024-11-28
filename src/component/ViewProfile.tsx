import { ChangeEvent,  useEffect, useState } from 'react'
import { fetchUserData } from '../Handler/UserHandler'
import { getUserCookie } from '../Handler/CookieHandler'
import { Box, Button, Card, CardContent, FormControl, InputLabel, TextField, Typography } from '@mui/material'

const ViewProfile = () => 
{
    const [Credentials, setCredentials] = useState({ name: "", gender: "", role: "", email: "", newName: "", newPassword: ""});

    useEffect(() => {
        const fetchUser = async () => 
        {
            const authToken = getUserCookie("authToken");

            if (authToken) 
            {
                try 
                {
                    const userData = await fetchUserData(authToken);
                    if (userData) 
                    {
                        setCredentials
                        (
                            {
                                name: userData.name || "", 
                                gender: userData.gender || "",
                                role: userData.role || "",
                                email: userData.email || "",
                                newName: "",
                                newPassword: ""
                            }
                        );
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

    const onChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (event) {
            setCredentials({ ...Credentials, [event.target.name]: event.target.value });
        }
    };

    return (
        <Card>
            <CardContent sx={{  justifyContent: 'center' }}>
                <Typography sx={{ fontSize: 36 }}>Profile</Typography>

                    <FormControl sx={{ display: 'flex', flexDirection: 'row' }}>
                        <InputLabel>Email:</InputLabel>
                        <TextField name="email" type="text" value={Credentials.email} size="small" onChange={onChange} disabled/>

                        <InputLabel>Gender:</InputLabel>
                        <TextField name="gender" type="text" value={Credentials.gender} size="small" onChange={onChange} disabled/>
                    </FormControl>

                    <FormControl sx={{ display: 'flex', flexDirection: 'row' }}>
                        <InputLabel>UserName:</InputLabel>
                        <TextField name="name" type="text" value={Credentials.name} size="small" onChange={onChange} disabled/>

                        <InputLabel>New UserName:</InputLabel>
                        <TextField name="newName" type="text" value={Credentials.newName} size="small" onChange={onChange}/>
                    </FormControl>

                    <FormControl sx={{ display: 'flex', flexDirection: 'row' }}>
                        <InputLabel>Role:</InputLabel>
                        <TextField name="role" type="text" value={Credentials.role} size="small" onChange={onChange} disabled/>

                        <InputLabel>New Password:</InputLabel>
                        <TextField name="newPassword" type="password" value={Credentials.newPassword} size="small" onChange={onChange}/>
                    </FormControl>

                    <Button variant='contained'>Submit</Button>
            </CardContent>
        </Card>
    );
};

export default ViewProfile;

