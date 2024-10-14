import { ChangeEvent,  useEffect, useState } from 'react'
import { fetchUserData } from '../Handler/UserHandler'
import { getUserCookie } from '../Handler/CookieHandler'
import TableRow from './TableRow'
import '../css/card.css'
import '../css/pages.css'
import { Button } from '@mui/material'

const ViewProfile = () => {
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
                    console.log('Fetched user data:', userData); 
                    if (userData) 
                    {
                        setCredentials({
                            name: userData.name || "",
                            gender: userData.gender || "",
                            role: userData.role || "",
                            email: userData.email || "",
                            newName: "",
                            newPassword: ""
                        });
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
        <section id="page">
            <span id="card-title">Profile</span>
            <table width="1000">
                <tbody>
                    <TableRow
                        firstName="name"
                        firstLabel="UserName"
                        firstType="text"
                        firstValue={Credentials.name}
                        secondName="gender"
                        secondLabel="Gender"
                        secondType="text"
                        secondValue={Credentials.gender}
                        onChange={onChange}
                        disabled={true}
                    />
                    <TableRow
                        firstName="role"
                        firstLabel="Role"
                        firstType="text"
                        firstValue={Credentials.role}
                        secondName="email"
                        secondLabel="Email"
                        secondType="email"
                        secondValue={Credentials.email}
                        onChange={onChange}
                        disabled={true}
                    />
                    <TableRow
                        firstName="newName"
                        firstLabel="New Name"
                        firstType="text"
                        firstValue={Credentials.newName}
                        secondName="newPassword"
                        secondLabel="New Password"
                        secondType="password"
                        secondValue={Credentials.newPassword}
                        onChange={onChange}
                        disabled={false}
                    />

                    <Button variant='contained'>Submit</Button>
                </tbody>
            </table>
        </section>
    );
};

export default ViewProfile;

