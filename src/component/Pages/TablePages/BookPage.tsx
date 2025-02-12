import { FC } from "react";

import { Box, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Paper, Table } from "@mui/material";

import { BookDataInterface } from "../../../Model/TablePageModel";
import { BookTableHeader } from "../../../Maps/TableMaps";

import { GetRole, IsLoggedIn } from "../../../Controller/OtherController";

import BookFilter from "./Filter/BookFilter";
import { PageItemToCenter } from "../../../Maps/FormatSyntaxMaps";
import ActionTableCell from "./TableCell/ActionTableCell";
import ContentTableCell from "./TableCell/ContentTableCell";

const role = GetRole();
const isAdmin:boolean = (role === "Admin");
const isLoggedIn = IsLoggedIn();

const BookData: BookDataInterface [] = 
[
    { name: "A", genre: "A", author: "A", publisher: "A", pages: "100", amount: "1" },
    { name: "B", genre: "B", author: "B", publisher: "B", pages: "100", amount: "1" },
    { name: "C", genre: "C", author: "C", publisher: "C", pages: "100", amount: "1" }
];

const SetTitle = isAdmin ? "Manage Books Record": "View Books";

const BookPage:FC = () =>
{
    return( 
        <Box sx={{ ...PageItemToCenter, flexDirection: 'column', padding: '0 50px'}}>
            <Typography sx={{fontSize: '24px'}}>{SetTitle}</Typography>

            <BookFilter isAdmin={isAdmin}/>

            <TableContainer sx={{ marginTop: 5 }} component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            {
                                BookTableHeader.map((header, index)=>
                                {
                                    if (header.condition && !isLoggedIn) return null;
                                    return <TableCell key={index}>{header.label}</TableCell>;
                                })  
                            }
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {BookData.map((data, index) => 
                            (
                                <TableRow key={index} sx={{"&:hover": {backgroundColor: "rgb(230, 230, 230)"}}}>
                                    <TableCell sx={{"&:hover": {cursor: "pointer"}}}>{index + 1}</TableCell>
                                    <ContentTableCell>{data.name}</ContentTableCell>
                                    <ContentTableCell>{data.genre}</ContentTableCell>
                                    <ContentTableCell>{data.author}</ContentTableCell>
                                    <ContentTableCell>{data.publisher}</ContentTableCell>
                                    <ContentTableCell>{data.pages}</ContentTableCell>
                                    <ContentTableCell>{data.amount}</ContentTableCell>
                                    {isLoggedIn ? 
                                        <ActionTableCell TableName={"Book"} Information={data} isAdmin={isAdmin}/> : <></>
                                    }
                                </TableRow>
                            )
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
}

export default BookPage