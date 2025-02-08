import { FC } from "react";

import { Box, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Paper, Table } from "@mui/material";

import { BookDataInterface } from "../../../Model/TablePageModel";
import { BookTableHeader } from "../../../Model/UIRenderingModel/NavModel";

import { GetRole, IsLoggedIn } from "../../../Controller/OtherController";

import BookFilter from "./Filter/BookFilter";
import ActionTableCell from "./TableCell/ActionTableCell";

const role = GetRole();
const isAdmin:boolean = (role === "Admin");
const isLoggedIn = IsLoggedIn();

const BookData : BookDataInterface = {
    name: "",
    genre: "",
    author: "",
    publisher: "",
    pages: ""
};

const SetTitle = isAdmin ? "Manage Books Record": "View Books";

const BookPage:FC = () =>
{
    return( 
        <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', marginTop: 5, padding: '0 50px'}}>
            <Typography sx={{fontSize: '24px'}}>{SetTitle}</Typography>
            
            <BookFilter isAdmin={isAdmin}/>

            <TableContainer sx={{ minWidth: '650px', marginTop: 5 }} component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            {
                                BookTableHeader.map((header)=>
                                {
                                    if (header.condition && !isLoggedIn) return null;
                                    return <TableCell key={header.label}>{header.label}</TableCell>;
                                })  
                            }
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        <TableRow sx={{"&:hover": {backgroundColor: "lightGray"}}}>
                            <TableCell>1</TableCell>
                            <TableCell>A</TableCell>
                            <TableCell>A</TableCell>
                            <TableCell>A</TableCell>
                            <TableCell>A</TableCell>
                            <TableCell>100</TableCell>
                            {isLoggedIn ? 
                                <ActionTableCell TableName={"Book"} Information={BookData} isAdmin={isAdmin}/> : <></>
                            }
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
}

export default BookPage