import {  FC, useState } from "react";

import { Box, TableContainer, Typography, Paper, Pagination } from "@mui/material";

import { BookDataInterface, PagesInterface } from "../../../Model/TablePageModel";

import { BookTabLabel, PaginationOption } from "../../../Maps/TableMaps";
import { ItemToCenter, PageItemToCenter } from "../../../Maps/FormatSyntaxMaps";

import BookFilter from "./Filter/BookFilter";
import CustomTab from "../../UIFragment/Tab/CustomTab";
import BookTabPanel from "./Tabs/BookTabPanel";

const BookData: BookDataInterface [] = 
[
    { bookname: "A", language: "English", genre: "A", author: "A", publisher: "A", pages: "100", amount: "1" },
    { bookname: "B", language: "English", genre: "B", author: "B", publisher: "B", pages: "100", amount: "1" },
    { bookname: "C", language: "English", genre: "C", author: "C", publisher: "C", pages: "100", amount: "1" },
];

const BookPage:FC<PagesInterface> = (loginData) =>
{
    const {isLoggedIn, isAdmin} = loginData;

    const [value, setValue] = useState(0);
    const [paginationValue, setPaginationValue] = useState(10);
    const count:number = Math.ceil(BookData.length / paginationValue);
    const SetTitle:string = isAdmin ? "Manage Books Record": "View Books";

    const changeValue = (type:string, newValue: number) =>
    {
        switch(type)
        {
            case "Tab":
                setValue(newValue);
                break;

            case "Pagination":
                setPaginationValue(newValue);
                break;
            
            default:
                break;
        }
    }
     
    return( 
        <Box sx={{ ...PageItemToCenter, flexDirection: 'column', padding: '0 50px'}}>
            <Typography sx={{fontSize: '24px'}}>{SetTitle}</Typography>

            <BookFilter isAdmin={isAdmin} value={value}/>

            <CustomTab isAdmin={isAdmin} value={value} paginationValue={paginationValue} valueChange={changeValue} tabLabel={BookTabLabel} paginationOption={PaginationOption}/>

            <TableContainer sx={{ marginTop: 5 }} component={Paper}>
                <BookTabPanel value={value} isAdmin={isAdmin} isLoggedIn={isLoggedIn} bookData={BookData}/>
            </TableContainer>
            <Pagination sx={{...ItemToCenter, alignItems: 'center', paddingTop: '10px'}} count={count}/>
        </Box>
    );
}

export default BookPage