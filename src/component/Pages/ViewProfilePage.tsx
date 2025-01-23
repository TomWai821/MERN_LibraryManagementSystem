import { ChangeEvent,  FormEvent,  useEffect, useState } from 'react'
import { fetchUserData } from '../../Controller/UserController/UserController'
import { getUserCookie } from '../../Controller/CookieController'
import { Box, Button, Card, CardContent, InputLabel, TextField, Typography } from '@mui/material'
import { ViewProfileModel } from '../../Model/InputFieldModel'
import { getResultInterface } from '../../Model/ResultModel'

const ButtonFormat = {width: '75%', mt: '15px', deleteButtonColor: 'rgb(230, 0, 0)', deleteButtonHoverColor: 'rgb(210, 0, 0)'};
const InputFieldSyntax = {display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '800px', marginTop: 3 }

const Fields = 
[
    {firstName:"username", firstLabel: "Username:", firstType: "string", secondName: "newName", secondLabel: "New Name:", secondType: "string"},
    {firstName:"role", firstLabel: "Role:",  firstType: "string", secondName: "newPassword", secondLabel: "New Password:", secondType: "password"},
]

const ViewProfilePage = () => 
{
    const [Credentials, setCredentials] = useState<ViewProfileModel>({ email: "", gender: "", username: "",  newName: "", role: "", newPassword: ""});

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
                    
                        <Box sx={InputFieldSyntax}>
                            <InputLabel sx={{width: '120px'}}>Email:</InputLabel>
                            <TextField name="email" type="email" value={Credentials.email} size="small" onChange={onChange} disabled/>

                            <InputLabel sx={{width: '120px'}}>Gender</InputLabel>
                            <TextField name="gender" type="string" value={Credentials.gender} size="small" onChange={onChange} disabled/>
                        </Box>
                    {
                        Fields.map((field, index) =>
                        (
                            <Box key={index} sx={InputFieldSyntax}>
                                <InputLabel sx={{width: '120px'}}>{field.firstLabel}</InputLabel>
                                <TextField name={field.firstName} type={field.firstType} value={Credentials[field.firstName as keyof ViewProfileModel]} size="small" onChange={onChange} disabled/>

                                <InputLabel sx={{width: '120px'}}>{field.secondLabel}</InputLabel>
                                <TextField name={field.secondName} type={field.secondType} value={Credentials[field.secondName as keyof ViewProfileModel]} size="small" onChange={onChange}/>
                            </Box>
                        ))
                    }
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

