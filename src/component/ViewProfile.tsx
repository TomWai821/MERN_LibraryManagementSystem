import {useEffect, useState} from 'react'
import { TableRow, TextField} from '@mui/material'
import '../css/card.css'
import '../css/pages.css'

const ViewProfile = () => 
{
    const [newData, setNewData] = useState({newName:"", newPassword:""})
    const [currentCredentials, setCurrentData] = useState({name: "", gender: "", role:"", email: ""})

    useEffect
    (() => {},[])

    return(
        <section id="page">
            <span id="card-title">Profile</span>

            <table width="1000">
                <tbody>
                    <tr>
                        <td>
                            <label htmlFor="name" id="card-label">UserName:</label>
                        </td>

                        <td>
                            <TextField name="name" type="text" size="small" disabled/>
                        </td>
                        
                        <td>
                            <label htmlFor="gender" id="card-label">Gender:</label>
                        </td>

                        <td>
                            <TextField name="gender" type="text" size="small" disabled/>
                        </td>
                    </tr>
                    
                    <tr>
                        <td>
                            <label htmlFor="role" id="card-label">Role:</label>
                        </td>

                        <td>
                            <TextField name="role" type="text" size="small" disabled/>
                        </td>

                        <td>
                            <label htmlFor="email" id="card-label">Email:</label>
                        </td>

                        <td>
                            <TextField name="email" type="text" size="small" disabled/>
                        </td>
                    </tr>

                    <tr>
                        <td>
                            <label htmlFor="newEmail" id="card-label">New Email:</label>
                        </td>

                        <td>
                            <TextField name="newEmail" type="email" size="small"/>
                        </td>

                        <td>
                            <label htmlFor="newPassword" id="card-label">New Password:</label>
                        </td>  

                        <td>
                            <TextField name="newPassword" type="password" size="small"/>
                        </td>
                    </tr>
                </tbody>
            </table>

        </section>
    )
}

export default ViewProfile