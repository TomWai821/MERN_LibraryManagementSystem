import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from "@mui/material";
import { FC, useEffect, useState } from "react";

import { ChangePage, GetRole } from "../../../Controller/OtherController";
import UserFilter from "./Filter/UserFilter";

const role = GetRole();
const isAdmin:boolean = (role === "Admin");

const UserPage:FC = () =>
{
    const [searchUser, setSearchUser] = useState();

    useEffect(() => 
    {
        if(!isAdmin)
        {
            ChangePage("/");
        }
    })
    
    return(
        <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', marginTop: 5, padding: '0 50px 0 50px'}}>
            <Typography sx={{fontSize: '24px'}}>User Management Page</Typography>

            <UserFilter isAdmin={isAdmin}/>

            <TableContainer sx={{ minWidth: '500px', marginTop: 5 }} component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>No.</TableCell>
                            <TableCell>Username</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Role</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell>Gender</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        <TableRow>
                            <TableCell>1</TableCell>
                            <TableCell></TableCell>
                            <TableCell></TableCell>
                            <TableCell></TableCell>
                            <TableCell></TableCell>
                            <TableCell></TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
}

export default UserPage