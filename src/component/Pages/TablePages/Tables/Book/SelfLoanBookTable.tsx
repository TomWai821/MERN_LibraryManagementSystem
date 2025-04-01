import { Avatar, Pagination, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import { ItemToCenter } from "../../../../../ArraysAndObjects/FormatSyntaxObjects";
import { FC, Fragment, useState } from "react";
import { SelfLoanBookTableHeader } from "../../../../../ArraysAndObjects/TableArrays";
import ContentTableCell from "../../../../UIFragment/ContentTableCell";
import { LoanBookInterface } from "../../../../../Model/ResultModel";
import { BookRecordTableInterface } from "../../../../../Model/BookTableModel";
import { TransferDateToISOString } from "../../../../../Controller/OtherController";
import ReturnBookTableCell from "../TableCell/ReturnBookTableCell";

const SelfLoanBookTable:FC<BookRecordTableInterface> = (DataForAllUserTable) => 
{
    const {value, bookData, isAdmin, paginationValue} = DataForAllUserTable;
    const LoanBookData = bookData as LoanBookInterface[];
    const TableName = "Book";

    const [page, setPage] = useState<number>(1);

    const startIndex = (page - 1) * paginationValue;
    const endIndex = startIndex + paginationValue;

    const paginatedData = LoanBookData.slice(startIndex, endIndex);
    const count = Math.ceil(LoanBookData.length / paginationValue);
    
    const getCountPage = () : void | number => 
    {
        return LoanBookData.length > paginationValue ? count + 1 : count;
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
                        {SelfLoanBookTableHeader.map((header, index) =>
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
                                    <ContentTableCell TableName={TableName} value={0} isAdmin={isAdmin} Information={data}>{data.bookDetails?.bookname}</ContentTableCell>
                                    <ContentTableCell TableName={TableName} value={0} isAdmin={isAdmin} Information={data}>{TransferDateToISOString(data.loanDate as Date)}</ContentTableCell>
                                    <ContentTableCell TableName={TableName} value={0} isAdmin={isAdmin} Information={data}>{TransferDateToISOString(data.dueDate as Date)}</ContentTableCell>
                                    <ContentTableCell TableName={TableName} value={0} isAdmin={isAdmin} Information={data}>{data.status}</ContentTableCell>
                                    <ReturnBookTableCell isAdmin={isAdmin} Information={data}/>
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

export default SelfLoanBookTable