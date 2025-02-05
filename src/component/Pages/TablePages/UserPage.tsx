import { Box, Button, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Tooltip, Typography } from "@mui/material";
import { FC, useState } from "react";

import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'

const UserPage:FC = () =>
{
    const [searchUser, setSearchUser] = useState();
    
    return(
        <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', marginTop: 5, padding: '0 50px 0 50px'}}>
            <Typography sx={{fontSize: '24px'}}>User Management Page</Typography>

            <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                <TextField label={"User Name"}></TextField>
                <TextField label={"Email"}></TextField>
                <TextField label={"Gender"}></TextField>
                <TextField label={"Gender"}></TextField>
                <Button>Search</Button>
            </Box>

            <TableContainer sx={{ minWidth: '500px', marginTop: 5}} component={Paper}>
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
                            <TableCell>
                                <Tooltip title={"Edit"} arrow>
                                    <IconButton>
                                        <EditIcon/>
                                    </IconButton>
                                </Tooltip>
                                <Tooltip title={"Delete"} arrow>
                                    <IconButton sx={{color: 'red'}}>
                                        <DeleteIcon/>
                                    </IconButton>
                                </Tooltip>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
}

export default UserPage