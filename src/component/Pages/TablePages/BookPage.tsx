import { FC } from "react";

import { Box, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Paper, Table } from "@mui/material";

import { BookDataInterface, UserDataInterface } from "../../../Model/TablePageModel";
import { BookTableHeader } from "../../../Model/UIRenderingModel/NavModel";

import { GetRole, IsLoggedIn } from "../../../Controller/OtherController";

import BookFilter from "./Filter/BookFilter";
import { PageItemToCenter } from "../../../Model/UIRenderingModel/FormatSyntaxModel";
import ActionTableCellWithProvider from "./TableCell/ActionTableCell";

const role = GetRole();
const isAdmin:boolean = (role === "Admin");
const isLoggedIn = IsLoggedIn();

const BookData: BookDataInterface [] = 
[
    { name: "A", genre: "A", author: "A", publisher: "A", pages: "100" },
    { name: "B", genre: "B", author: "B", publisher: "B", pages: "100" },
    { name: "C", genre: "C", author: "C", publisher: "C", pages: "100" }
];

const SetTitle = isAdmin ? "Manage Books Record": "View Books";

const BookPage:FC = () =>
{
    return( 
        <Box sx={{ ...PageItemToCenter, flexDirection: 'column', padding: '0 50px'}}>
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
                        {BookData.map((data, index) => 
                            (
                                <TableRow key={index} sx={{"&:hover": {backgroundColor: "lightGray"}}}>
                                    <TableCell>{index + 1}</TableCell>
                                    <TableCell>{data.name}</TableCell>
                                    <TableCell>{data.genre}</TableCell>
                                    <TableCell>{data.author}</TableCell>
                                    <TableCell>{data.publisher}</TableCell>
                                    <TableCell>{data.pages}</TableCell>
                                    {isLoggedIn ? 
                                        <ActionTableCellWithProvider TableName={"Book"} Information={data} isAdmin={isAdmin}/> : <></>
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