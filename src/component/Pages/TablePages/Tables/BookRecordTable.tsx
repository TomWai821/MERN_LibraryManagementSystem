import { FC } from "react";

import { Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";

// UI Fragment and Manager
import ActionTableCell from "../../../Manager/ActionTableCellManager";
import ContentTableCell from "../../../UIFragment/ContentTableCell";

// Model
import { BookRecordTableInterface } from "../../../../Model/BookTableModel";

// Data(CSS Syntax)
import { BookRecordTableHeader } from "../../../../Maps/TableMaps";


const BookRecordTable:FC<BookRecordTableInterface> = ({isLoggedIn, isAdmin, bookData}) => 
{

    return(
        <Table>
            <TableHead>
                <TableRow>
                    {
                        BookRecordTableHeader.map((header, index)=>
                        {
                            if (header.condition && !isLoggedIn) return null;
                            return <TableCell key={index}>{header.label}</TableCell>;
                        })  
                    }
                </TableRow>
            </TableHead>
            
            <TableBody>
                {bookData.map((data, index) => 
                    (
                        <TableRow key={index} sx={{"&:hover": {backgroundColor: "rgb(230, 230, 230)"}}}>
                            <TableCell sx={{"&:hover": {cursor: "pointer"}}}>{index + 1}</TableCell>
                            {
                                /*
                                    <ContentTableCell isAdmin={isAdmin} Information={currentTableData[value]}>{data.bookname}</ContentTableCell>
                                    <ContentTableCell isAdmin={isAdmin} Information={currentTableData[value]}>{data.language}</ContentTableCell>
                                    <ContentTableCell isAdmin={isAdmin} Information={currentTableData[value]}>{data.genre}</ContentTableCell>
                                    <ContentTableCell isAdmin={isAdmin} Information={currentTableData[value]}>{data.author}</ContentTableCell>
                                    <ContentTableCell isAdmin={isAdmin} Information={currentTableData[value]}>{data.publisher}</ContentTableCell>
                                    <ContentTableCell isAdmin={isAdmin} Information={currentTableData[value]}>{data.pages}</ContentTableCell>
                                    <ContentTableCell isAdmin={isAdmin} Information={currentTableData[value]}>{data.amount}</ContentTableCell>
                                */
                            }
                            {isLoggedIn && (<ActionTableCell TableName={"Book"} Information={data} isAdmin={isAdmin} value={0}/>)}
                        </TableRow>
                    )
                )}
            </TableBody>
        </Table>
    )
}

export default BookRecordTable;