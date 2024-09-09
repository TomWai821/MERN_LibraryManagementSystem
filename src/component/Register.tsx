import { FormEvent, ChangeEvent, useState } from 'react';
import '../css/pages.css'

const Register = () => 
{
    const [Credentials, setCredentials] = useState({email: "", userName: "", password: ""})

    const handleRegister = async (e: FormEvent) => 
    {
        e.preventDefault();

        const response = await fetch('http://localhost:5000/api/user/register',
            {
                method: "POST",
                headers: 
                {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify
                (
                    {
                        email: Credentials.email,
                        name: Credentials.userName,
                        password: Credentials.password
                    }
                )
            }
        );

        const result = response.json();
        console.log(result);
    }

    const onChange = (e: ChangeEvent<HTMLInputElement>) => 
    {
        setCredentials({...Credentials, [e.target.name]: e.target.value});
    }

    return(
        <section id="page">
            <div id="card">
            <span id="card-title">Register</span>
                <form onSubmit={handleRegister}>

                    <div id="card-input">
                        <label htmlFor="email" id="card-label">Email:</label>
                        <input name="email" onChange={onChange}/>
                    </div>

                    <div id="card-input">
                        <label htmlFor="username" id="card-label">UserName:</label>
                        <input name="username" onChange={onChange}/>
                    </div>

                    <div id="card-input">
                        <label htmlFor="password" id="card-label">Email:</label>
                        <input name="password" onChange={onChange}/>
                    </div>

                    <input type="submit"/>
                </form>
            </div>
        </section>
    )
}

export default Register