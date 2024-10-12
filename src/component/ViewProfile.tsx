import { useEffect, useState } from 'react'
import TableRow from './TableRow'
import { TextField } from '@mui/material'
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
                    <TableRow 
                        firstName="name" 
                        firstLabel="UserName" 
                        firstType="text" 
                        secondName="gender" 
                        secondLabel="Gender"
                        secondType="text"  
                        disabled={true}
                    />

                    <TableRow 
                        firstName="role" 
                        firstLabel="Role" 
                        secondName="email" 
                        firstType="text" 
                        secondLabel="Email" 
                        secondType="email"  
                        disabled={true}
                    />

                    <TableRow 
                        firstName="newName" 
                        firstLabel="new Name" 
                        firstType="text" 
                        secondName="newPassword" 
                        secondLabel="new Password" 
                        secondType="password"  
                        disabled={false}
                    />
                </tbody>
            </table>

        </section>
    )
}

export default ViewProfile