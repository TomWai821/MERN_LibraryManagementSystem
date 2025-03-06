import { Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import { BookRecordTableHeader } from "../../../../Maps/TableMaps";
import { FC } from "react";
import { BookRecordTableInterface } from "../../../../Model/TablePageModel";
import ActionTableCell from "../../../Manager/ActionTableCellManager";
import ContentTableCell from "../../../UIFragment/TableCell/ContentTableCell";

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
                            <ContentTableCell>{data.bookname}</ContentTableCell>
                            <ContentTableCell>{data.language}</ContentTableCell>
                            <ContentTableCell>{data.genre}</ContentTableCell>
                            <ContentTableCell>{data.author}</ContentTableCell>
                            <ContentTableCell>{data.publisher}</ContentTableCell>
                            <ContentTableCell>{data.pages}</ContentTableCell>
                            <ContentTableCell>{data.amount}</ContentTableCell>
                            {isLoggedIn && (<ActionTableCell TableName={"Book"} Information={data} isAdmin={isAdmin} value={0}/>)}
                        </TableRow>
                    )
                )}
            </TableBody>
        </Table>
    )
}

export default BookRecordTable;