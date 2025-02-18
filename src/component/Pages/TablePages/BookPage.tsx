import {  FC, useState } from "react";

import { Box, TableContainer, Typography, Paper, Pagination, Tabs } from "@mui/material";

import { BookDataInterface } from "../../../Model/TablePageModel";

import { GetRole, IsLoggedIn } from "../../../Controller/OtherController";

import BookFilter from "./Filter/BookFilter";
import { ItemToCenter, PageItemToCenter } from "../../../Maps/FormatSyntaxMaps";
import CustomTab from "../../UIFragment/Tab/CustomTab";
import BookTabPanel from "./Tabs/BookTabPanel";
import { BookTabLabel } from "../../../Maps/TableMaps";

const role = GetRole();
const isAdmin:boolean = (role === "Admin");
const isLoggedIn = IsLoggedIn();

const BookData: BookDataInterface [] = 
[
    { bookname: "A", genre: "A", author: "A", publisher: "A", pages: "100", amount: "1" },
    { bookname: "B", genre: "B", author: "B", publisher: "B", pages: "100", amount: "1" },
    { bookname: "C", genre: "C", author: "C", publisher: "C", pages: "100", amount: "1" }
];

const SetTitle = isAdmin ? "Manage Books Record": "View Books";

const BookPage:FC = () =>
{
    const [value, setValue] = useState(0);

    const changeValue = (newValue: number) =>
    {
        setValue(newValue);
    }
     
    return( 
        <Box sx={{ ...PageItemToCenter, flexDirection: 'column', padding: '0 50px'}}>
            <Typography sx={{fontSize: '24px'}}>{SetTitle}</Typography>

            <BookFilter isAdmin={isAdmin}/>

            <CustomTab isAdmin={isAdmin} value={value} valueChange={changeValue} tabLabel={BookTabLabel}/>

            <TableContainer sx={{ marginTop: 5 }} component={Paper}>
                <BookTabPanel value={value} isAdmin={isAdmin} isLoggedIn={isLoggedIn} bookData={BookData}/>
            </TableContainer>
            <Pagination sx={{...ItemToCenter, alignItems: 'center', paddingTop: '10px'}} count={10}/>
        </Box>
    );
}

export default BookPage