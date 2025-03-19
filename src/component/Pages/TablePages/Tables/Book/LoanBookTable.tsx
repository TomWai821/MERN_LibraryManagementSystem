import { FC, Fragment, useState } from "react";
import { Pagination, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";

// UI Fragment
import ContentTableCell from "../../../../UIFragment/ContentTableCell";
import ActionTableCell from "../../../../Manager/ActionTableCellManager";

// Models
import { BookRecordTableInterface } from "../../../../../Model/BookTableModel";

// Data (CSS Syntax and table header)
import { ItemToCenter } from "../../../../../Maps/FormatSyntaxMaps";
import { AllUserTableHeader } from "../../../../../Maps/TableMaps";


const LoanBookTable:FC<BookRecordTableInterface> = (DataForAllUserTable) => 
{
    const {isAdmin, value, bookData, paginationValue} = DataForAllUserTable;
    const TableName = "Book";

    const currentTableData = bookData[value];
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
                        {AllUserTableHeader.map((header, index) =>
                            (
                                <TableCell key={index}>{header.label}</TableCell>
                            ) 
                        )}  
                    </TableRow>
                </TableHead>

                <TableBody>
                    
                    {
                    /*
                    paginatedData.map((data, index) => 
                        (
                            <TableRow key={index} sx={{"&:hover": {backgroundColor: "rgb(230, 230, 230)"}}}>
                                <TableCell sx={{"&:hover": {cursor: "pointer"}}}>{index + 1}</TableCell>
                                <ContentTableCell TableName={TableName} value={value} isAdmin={isAdmin} Information={data}>{data.bookname}</ContentTableCell>
                                <ContentTableCell TableName={TableName} value={value} isAdmin={isAdmin} Information={data}>{data.genreID}</ContentTableCell>
                                <ContentTableCell TableName={TableName} value={value} isAdmin={isAdmin} Information={data}>{data.languageID}</ContentTableCell>
                                <ContentTableCell TableName={TableName} value={value} isAdmin={isAdmin} Information={data}>{data.page}</ContentTableCell>
                                <ContentTableCell TableName={TableName} value={value} isAdmin={isAdmin} Information={data}>{data.amount}</ContentTableCell>
                                {isAdmin && (<ActionTableCell value={value} TableName={TableName} Information={data} isAdmin={isAdmin}/>)}
                            </TableRow>
                        )
                    )
                    */
                    }
                    
                </TableBody>
            </Table>

            <Pagination
                sx={{ ...ItemToCenter, alignItems: "center", paddingTop: "10px" }}
                count={getCountPage() as number}
                page={page}
                onChange={handlePageChange}
            />
        </Fragment>
    );
}

export default LoanBookTable
