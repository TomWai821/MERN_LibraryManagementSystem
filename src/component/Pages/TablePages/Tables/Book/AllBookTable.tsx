import { FC, Fragment, useState } from "react";
import { Pagination, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";

// UI Fragment
import ContentTableCell from "../../../../UIFragment/ContentTableCell";
import ActionTableCell from "../../../../Manager/ActionTableCellManager";

// Models
import { BookRecordTableInterface } from "../../../../../Model/BookTableModel";
import { AllBookTableHeader } from "../../../../../ArraysAndObjects/TableArrays";
import { ItemToCenter } from "../../../../../ArraysAndObjects/FormatSyntaxObjects";

// Data (CSS Syntax and table header)



const AllBookTable:FC<BookRecordTableInterface> = (DataForAllUserTable) => 
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
                        {AllBookTableHeader.map((header, index) =>
                            (
                                <TableCell sx={{fontSize: '16px'}} key={index}>{header.label}</TableCell>
                            ) 
                        )}  
                    </TableRow>
                </TableHead>

                <TableBody>
                    {paginatedData.map((data, index) => 
                        (
                            <TableRow key={index} sx={{"&:hover": {backgroundColor: "rgb(230, 230, 230)"}}}>
                                <TableCell sx={{fontSize: "16px", "&:hover": {cursor: "pointer"}}}>{index + 1}</TableCell>
                                <ContentTableCell TableName={TableName} value={value} isAdmin={isAdmin} Information={data}>{data.bookname}</ContentTableCell>
                                <ContentTableCell TableName={TableName} value={value} isAdmin={isAdmin} Information={data}>{data.genreDetails?.genre}</ContentTableCell>
                                <ContentTableCell TableName={TableName} value={value} isAdmin={isAdmin} Information={data}>{data.languageDetails?.language}</ContentTableCell>
                                <ContentTableCell TableName={TableName} value={value} isAdmin={isAdmin} Information={data}>{data.status}</ContentTableCell>
                                <ContentTableCell TableName={TableName} value={value} isAdmin={isAdmin} Information={data}>{data.pages}</ContentTableCell>
                                {isAdmin && (<ActionTableCell value={value} TableName={TableName} Information={data} isAdmin={isAdmin}/>)}
                            </TableRow>
                        )
                    )}
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

export default AllBookTable
