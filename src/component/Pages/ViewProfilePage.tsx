import { ChangeEvent, FormEvent, useEffect, useState, Fragment } from 'react'

import { Box, Button, Card, CardContent, TextField, Typography } from '@mui/material'

// Context
import { useModal } from '../../Context/ModalContext'

// Models
import { ViewProfileModel } from '../../Model/InputFieldModel'
import { GetResultInterface } from '../../Model/ResultModel'
import { UserDataInterface } from '../../Model/UserTableModel'

// Controllers
import { FetchUserData } from '../../Controller/UserController/UserGetController'
import { GetUserCookie } from '../../Controller/CookieController'

// Another Modal
import DeleteProfileConfirmModal from '../Modal/Confirmation/Profile/DeleteProfileComfirmModal'

// Data(CSS Syntax)
import { DeleteButton, PageItemToCenter, PageTitleSyntax, ViewProfileButton } from '../../Maps/FormatSyntaxMaps'
import { ViewProfileField } from '../../Maps/TextFieldsMaps'

const ViewProfilePage = () => 
{
    const [Credentials, setCredentials] = useState<ViewProfileModel>({ email: "", gender: "", username: "",  newName: "", role: "", newPassword: ""});
    const {handleOpen} = useModal();

    useEffect(() => 
    {
        const fetchUser = async () => 
        {
            const authToken = GetUserCookie("authToken") || sessionStorage.getItem("authToken");

            if (authToken) 
            {
                try
                {
                    const userData = await FetchUserData(authToken);
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

    const updateCredentials = (userData: GetResultInterface) =>
    {
        const foundUser = Array.isArray(userData.foundUser) ? userData.foundUser[0] : userData.foundUser as UserDataInterface;

        setCredentials
        (
            {
                username: foundUser.username|| "", 
                gender: foundUser.gender || "",
                role: foundUser.role || "",
                email: foundUser.email || "",
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

    const onClick = () => 
    {
        handleOpen(<DeleteProfileConfirmModal/>);
    }

    return (
        <Box sx={PageItemToCenter}>
            <Card variant='outlined' sx={{ width: '900px' }}>
                <CardContent>
                    <Typography sx={ PageTitleSyntax }>Profile</Typography>
                    <Box sx={{ padding: '20px', display: 'grid', gap: '10px 50px', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))'}}>
                    {
                        ViewProfileField.map((field, index) =>
                        (
                            <Fragment key={index}>
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
                            </Fragment>
                        ))
                    }
                    </Box>

                    <Box sx={{...PageItemToCenter, flexDirection: 'column', alignItems: 'center', mt: ViewProfileButton.marginTop}}>
                        <Button variant='contained' sx={{...ViewProfileButton}} onClick={onSubmit}>Change Data</Button>
                        <Button variant='contained' sx={{...ViewProfileButton, ...DeleteButton}} onClick={onClick}>Delete Account</Button>
                    </Box>
                </CardContent>
            </Card>
        </Box>
    )
};

export default ViewProfilePage;

