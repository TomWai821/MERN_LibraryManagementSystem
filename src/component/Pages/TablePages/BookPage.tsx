import { Box, IconButton, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Tooltip, Paper, Table, TextField, Button } from "@mui/material";
import { FC, useState } from "react";

import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import { getUserCookie } from "../../../Controller/CookieController";

const role = getUserCookie("role") || sessionStorage.getItem("role");

let isAdmin:boolean = (role === "Admin");

const BookPage:FC = () =>
{
    const [searchBook, setSearchBook] = useState();

    const onChange = () => 
    {

    }

    return(
        <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', marginTop: 5, padding: '0 50px 0 50px'}}>
            <Typography sx={{fontSize: '24px'}}>View Books</Typography>

            <Box sx={{ padding: '25px 15%'}}>
                <Typography sx={{fontSize: '20px'}}>Filter</Typography>
                <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                    <TextField label={"Book Name"} size="small" sx={{width: '80%', marginRight: '10px'}}/>
                    <Button variant='contained'>Search</Button>
                </Box>
            </Box>

            <TableContainer sx={{ minWidth: '650px', marginTop: 5 }} component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>No.</TableCell>
                            <TableCell>Book Name</TableCell>
                            <TableCell>Genre</TableCell>
                            <TableCell>Publisher</TableCell>
                            <TableCell>Author</TableCell>
                            <TableCell>Pages</TableCell>
                            {isAdmin ?
                                <TableCell>Actions</TableCell> : <></>
                            }
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        <TableRow>
                            <TableCell>1</TableCell>
                            <TableCell>A</TableCell>
                            <TableCell>A</TableCell>
                            <TableCell>A</TableCell>
                            <TableCell>A</TableCell>
                            <TableCell>100</TableCell>
                            {isAdmin?
                            <TableCell>
                                <Tooltip title={"Edit"} arrow>
                                    <IconButton onClick={() => {}}>
                                        <EditIcon/>
                                    </IconButton>
                                </Tooltip>
                                
                                <Tooltip title={"Delete"} arrow>
                                    <IconButton sx={{color: 'red', "&:hover":{color: 'rgb(240, 0, 0)'}}} onClick={() => {}}>
                                        <DeleteIcon/>
                                    </IconButton>
                                </Tooltip>
                            </TableCell>
                            :
                            <></>
                            }
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
}

export default BookPage