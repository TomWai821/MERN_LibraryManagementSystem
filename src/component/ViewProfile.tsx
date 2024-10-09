import {FormControl, TextField} from '@mui/material'
import '../css/card.css'
import '../css/pages.css'


const ViewProfile = () => 
{
    return(
        <section id="page">
            <FormControl variant="standard" sx={{ minWidth: 500 }}>

            <span id="card-title">Profile</span>

            <div id="card-input">
                <label htmlFor="username" id="card-label">User Name:</label>
                <TextField name="username" type="text" size="small" disabled></TextField>
            </div>

            <div id="card-input">
                <label htmlFor="email" id="card-label">Email:</label>
                <TextField name="email" type="text" size="small" disabled></TextField>
            </div>

            </FormControl>
        </section>
    )
}

export default ViewProfile