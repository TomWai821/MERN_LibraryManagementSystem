import {  ChangeEvent, FC, useState } from "react";
import { Box, TableContainer, Typography, Paper, Pagination } from "@mui/material";

// Another Component
import BookFilter from "./Filter/BookFilter";
import CustomTab from "../../UIFragment/CustomTab";
import BookTabPanel from "./Tabs/BookTabPanel";

// Model
import { BookDataInterface, BookSearchInterface } from "../../../Model/BookTableModel";
import { PagesInterface } from "../../../Model/TablePagesAndModalModel";

// Data (CSS SYntax and dropdown)
import { PageItemToCenter } from "../../../Maps/FormatSyntaxMaps";
import { BookTabLabel, PaginationOption } from "../../../Maps/TableMaps";
import { useBookContext } from "../../../Context/Book/BookContext";
import TableTitle from "../../UIFragment/TableTitle";

const BookPage:FC<PagesInterface> = (loginData) =>
{
    const { isLoggedIn, isAdmin } = loginData;
    const { AllBook, LoanBook, OnShelfBook } = useBookContext();

    const bookData = [AllBook, LoanBook, OnShelfBook];
    const SetTitle:string = isAdmin ? "Manage Books Record": "View Books";

    const [searchBook, setSearchBook] = useState<BookSearchInterface>({ bookname: "", language: "All", genre: "All", pages: 0 });
    const [tabValue, setTabValue] = useState(0);
    const [paginationValue, setPaginationValue] = useState(10);

    const onChange = (event: ChangeEvent<HTMLInputElement>) => 
    {
        setSearchBook({ ...searchBook, [event.target.name]: event.target.value });
    }

    const changeValue = (type:string, newValue: number) =>
    {
        switch(type)
        {
            case "Tab":
                setTabValue(newValue);
                break;

            case "Pagination":
                setPaginationValue(newValue);
                break;
            
            default:
                break;
        }
    }

    const SearchBook = () => 
    {

    }
     
    return( 
        <Box sx={{ ...PageItemToCenter, flexDirection: 'column', padding: '0 50px'}}>
            <TableTitle title={"Book Mangement Page"} dataLength={bookData[tabValue].length}/>

            <BookFilter isAdmin={isAdmin} value={tabValue} onChange={onChange} searchData={searchBook} Search={SearchBook}/>

            <CustomTab isAdmin={isAdmin} value={tabValue} valueChange={changeValue} paginationValue={paginationValue} tabLabel={BookTabLabel} paginationOption={PaginationOption}/>

            <TableContainer sx={{ marginTop: 5 }} component={Paper}>
                <BookTabPanel value={tabValue} isAdmin={isAdmin} bookData={bookData} paginationValue={paginationValue} isLoggedIn={isLoggedIn}/>
            </TableContainer>
        </Box>
    );
}

export default BookPage