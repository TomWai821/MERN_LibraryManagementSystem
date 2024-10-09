import { FormEvent, ChangeEvent, useState } from 'react';
import { RegisterHandler } from '../Handler/UserHandler';
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

                <div id="card-input">
                    <label htmlFor="email" id="card-label">Email:</label>
                    <TextField name="email" type="email" value={Credentials.email} onChange={onChange} size="small" required/>
                    <span></span>
                </div>

                <div id="card-input">
                    <label htmlFor="name" id="card-label">UserName:</label>
                    <TextField name="name" type="text" value={Credentials.name} onChange={onChange} size="small" required/>
                    <span>Must be at least 6 characters long</span>
                </div>

                <div id="card-input">
                    <label htmlFor="password" id="card-label">Password:</label>
                    <TextField name="password" type="password" value={Credentials.password} onChange={onChange} size="small" required/>
                    <span>Must be at least 6 characters long</span>
                </div>

                <div id="card-input">
                    <label htmlFor="birthDay" id="card-label">Date Of Birth:</label>
                    <TextField name="birthDay" type="date" value={Credentials.birthDay} onChange={onChange} size="small" required/>
                    
                </div>

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