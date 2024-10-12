import { FormEvent, ChangeEvent, useState } from 'react';
import { RegisterHandler } from '../Handler/UserHandler';
import InputField from './InputField'
import { MenuItem, Select, FormControl, SelectChangeEvent, TextField, Button } from '@mui/material'
import '../css/card.css'
import '../css/pages.css'

const Register = () => 
{
    const [Credentials, setCredentials] = useState({email: "", name: "", password: "", birthDay: "", gender: "Male"});

    const handleRegister = async (e: FormEvent) => 
    {
        e.preventDefault();

        await RegisterHandler(Credentials.email, Credentials.name, Credentials.password, Credentials.birthDay, Credentials.gender);
    }

    const onChange = (e: ChangeEvent<HTMLInputElement>) => 
    {
        setCredentials({...Credentials, [e.target.name]: e.target.value});
    }

    const selectonChange = (e: SelectChangeEvent<string>) => 
    {
        setCredentials({...Credentials, [e.target.name]: e.target.value});
    }

    return(
        <section id="page">

            <FormControl variant="standard" sx={{ minWidth: 500 }}>

                <span id="card-title">Register</span>

                <InputField name="email" 
                    type="email" 
                    label="Email" 
                    value={Credentials.email} 
                    onChange={onChange} 
                    requireText="" 
                />

                <InputField name="name" 
                    type="text" 
                    label="Username" 
                    value={Credentials.name} 
                    onChange={onChange} 
                    requireText="Must be at least 6 characters long" 
                />

                <InputField name="password" 
                    type="password" 
                    label="Password" 
                    value={Credentials.password} 
                    onChange={onChange} 
                    requireText="Must be at least 6 characters long" 
                />

                <InputField name="birthDay" 
                    type="date" 
                    label="Date of Birth" 
                    value={Credentials.birthDay} 
                    onChange={onChange} 
                    requireText="" 
                />

                <div id="card-input">
                    <label htmlFor="gender" id="card-label">Gender:</label>
                    <Select name="gender" value={Credentials.gender} onChange={selectonChange} size="small" required>
                        <MenuItem value={"Male"}>Male</MenuItem>
                        <MenuItem value={"Female"}>Female</MenuItem>
                    </Select>
                </div>
                
                <div id="card-input">
                    <Button variant="contained" onClick={handleRegister}>Submit</Button>
                </div>
            </FormControl>
        </section>
    )
}

export default Register