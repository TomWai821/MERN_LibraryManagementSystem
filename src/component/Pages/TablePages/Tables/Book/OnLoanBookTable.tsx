import { FC, Fragment, useState } from "react";
import { Avatar, Pagination, Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@mui/material";

// UI Fragment
import ContentTableCell from "../../../../UIFragment/ContentTableCell";
import ActionTableCell from "../../../../Manager/ActionTableCellManager";

// Models
import { BookRecordTableInterface } from "../../../../../Model/BookTableModel";

// Data (CSS Syntax and table header)
import { LoanBookTableHeader } from "../../../../../ArraysAndObjects/TableArrays";
import { ItemToCenter } from "../../../../../ArraysAndObjects/FormatSyntaxObjects";
import { LoanBookInterface } from "../../../../../Model/ResultModel";
import { TransferDateToISOString } from "../../../../../Controller/OtherController";

const LoanBookTable:FC<BookRecordTableInterface> = (DataForAllUserTable) => 
{
    const {value, bookData, isAdmin, paginationValue, isLoggedIn} = DataForAllUserTable;
    const TableName = "Book";

    const currentTableData = bookData[value] as LoanBookInterface[];
    const [page, setPage] = useState<number>(1);

    const startIndex = (page - 1) * paginationValue;
    const endIndex = startIndex + paginationValue;

    const paginatedData = currentTableData.slice(startIndex, endIndex);
    const count = Math.ceil(bookData.length / paginationValue);
    
    const getCountPage = () : void | number => 
    {
        return currentTableData.length > paginationValue ? count + 1 : count;
    }

    const handlePageChange = (_: React.ChangeEvent<unknown>, newPage: number) => 
    {
        setPage(newPage);
    };

    useState(() => 
        {
            getCountPage();
        }
    )
    
    return(
        <Fragment>
            <Table>
                <TableHead>
                    <TableRow>
                        {LoanBookTableHeader.map((header, index) =>
                            (
                                <TableCell key={index}>{header.label}</TableCell>
                            ) 
                        )}  
                    </TableRow>
                </TableHead>

                <TableBody>
                {
                    paginatedData.map((data, index) => 
                        (
                            <TableRow key={index} sx={{"&:hover": {backgroundColor: "rgb(230, 230, 230)"}}}>
                                <TableCell sx={{"&:hover": {cursor: "pointer"}}}>{index + 1}</TableCell>
                                <ContentTableCell TableName={TableName} value={value} isAdmin={isAdmin} Information={data}>
                                    <Avatar src={data.bookDetails?.image?.url} alt="Preview" variant="rounded" sx={{ width: "150px", height: "225px" }}/>
                                </ContentTableCell>
                                <ContentTableCell TableName={TableName} value={value} isAdmin={isAdmin} Information={data}>{data.bookDetails?.bookname}</ContentTableCell>
                                <ContentTableCell TableName={TableName} value={value} isAdmin={isAdmin} Information={data}>{data.userDetails?.username}</ContentTableCell>
                                <ContentTableCell TableName={TableName} value={value} isAdmin={isAdmin} Information={data}>{TransferDateToISOString(data.loanDate as Date)}</ContentTableCell>
                                <ContentTableCell TableName={TableName} value={value} isAdmin={isAdmin} Information={data}>{TransferDateToISOString(data.dueDate as Date)}</ContentTableCell>
                                <ContentTableCell TableName={TableName} value={value} isAdmin={isAdmin} Information={data}>{data.status}</ContentTableCell>
                                {isAdmin && (<ActionTableCell value={value} TableName={TableName} Information={data} isAdmin={isAdmin} isLoggedIn={isLoggedIn}/>)}
                            </TableRow>
                        )
                    )
                }
                </TableBody>
            </Table>

            <Pagination sx={{ ...ItemToCenter, alignItems: "center", paddingTop: "10px" }} count={getCountPage() as number} page={page} onChange={handlePageChange}/>
        </Fragment>
    );
}

export default LoanBookTable
