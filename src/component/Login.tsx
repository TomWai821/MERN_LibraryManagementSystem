import { FormEvent, ChangeEvent, useState } from 'react';
import '../css/card.css'
import '../css/pages.css'

const Login = () =>
{
    const [Credentials, setCredentials] = useState({email:"", password: ""});

    const handleLogin = async (e: FormEvent) => 
    {
        e.preventDefault();
        const response = await fetch('http://localhost:5000/api/user/login',
            {
                method:'POST',
                headers: 
                { 
                    'Content-Type':'application/json'
                },
                body: JSON.stringify(
                    {
                        email: Credentials.email,
                        password: Credentials.password
                    }
                )
            }
        );

        const result = await response.json();
        console.log(result);

        if(result.success)
        {
            
        }
    }

    const onChange = (e: ChangeEvent<HTMLInputElement>) => 
    {
        setCredentials({...Credentials, [e.target.name]: e.target.value});
    }

    return(
        <section id="page"> 
            <div id="card">
                <span id="card-title">Login Page</span>
                <form onSubmit={handleLogin}>
                    <div id="card-input">
                        <label htmlFor="email" id="card-label">Email:</label>
                        <input type="email" name="email" value={Credentials.email} onChange={onChange}/>
                    </div>
                            
                    <div id="card-input">
                        <label htmlFor="password" id="card-label">Password:</label>
                        <input type="password" name="password" value={Credentials.password} onChange={onChange}/>
                    </div>

                    <input type="submit"/>
                </form>
            </div>
        </section>
    )
}

export default Login