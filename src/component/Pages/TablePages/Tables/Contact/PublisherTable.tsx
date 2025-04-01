import { FC, Fragment, useState } from "react";
import { Pagination, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";

// UI Fragment
import ContentTableCell from "../../../../UIFragment/ContentTableCell";
import ActionTableCell from "../../../../Manager/ActionTableCellManager";

// Models
import { ContactTableInterface } from "../../../../../Model/BookTableModel";
import { PublisherTableHeader } from "../../../../../ArraysAndObjects/TableArrays";
import { ItemToCenter } from "../../../../../ArraysAndObjects/FormatSyntaxObjects";
import { ContactInterface } from "../../../../../Model/ResultModel";

const PublisherTable:FC<ContactTableInterface> = (DataForAllUserTable) => 
{
    const {isAdmin, value, contactData, paginationValue, isLoggedIn} = DataForAllUserTable;
    const TableName = "Contact";

    const currentTableData = contactData.Publisher as ContactInterface[];
    const [page, setPage] = useState<number>(1);

    const startIndex = (page - 1) * paginationValue;
    const endIndex = startIndex + paginationValue;

    const paginatedData = currentTableData.slice(startIndex, endIndex);
    const count = Math.ceil(currentTableData.length / paginationValue);
    
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
                        {PublisherTableHeader.map((header, index) =>
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
                                <ContentTableCell TableName={TableName} value={value} isAdmin={isAdmin} isLoggedIn={isLoggedIn} Information={data}>{data.publisher}</ContentTableCell>
                                <ContentTableCell TableName={TableName} value={value} isAdmin={isAdmin} isLoggedIn={isLoggedIn} Information={data}>{data.email}</ContentTableCell>
                                <ContentTableCell TableName={TableName} value={value} isAdmin={isAdmin} isLoggedIn={isLoggedIn} Information={data}>{data.phoneNumber}</ContentTableCell>
                                <ActionTableCell value={value} TableName={TableName} Information={data} isAdmin={true} isLoggedIn={isLoggedIn}/>
                            </TableRow>
                        )
                    )}
                </TableBody>
            </Table>

            <Pagination sx={{ ...ItemToCenter, alignItems: "center", paddingTop: "10px" }} count={getCountPage() as number} page={page} onChange={handlePageChange}/>
        </Fragment>
    );
}

export default PublisherTable
