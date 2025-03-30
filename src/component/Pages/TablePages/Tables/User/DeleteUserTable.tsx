import { FC, Fragment, useState } from "react";
import { Pagination, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";

// UI Fragment And Manager
import ContentTableCell from "../../../../UIFragment/ContentTableCell";
import ActionTableCell from "../../../../Manager/ActionTableCellManager";

// Another useful function and model
import { TransferDateToString } from "../../../../../Controller/OtherController";
import { UserDataTableInterface } from "../../../../../Model/UserTableModel";

// Data (CSS Syntax and table header)
import { ItemToCenter } from "../../../../../ArraysAndObjects/FormatSyntaxObjects";
import { DeleteUserTableHeader } from "../../../../../ArraysAndObjects/TableArrays";

const DeleteUserTable:FC<UserDataTableInterface> = (DataForDeleteUserTable) => 
{
    const {isAdmin, value, userData, paginationValue} = DataForDeleteUserTable;
    const TableName = "User";

    const currentTableData = userData[value];
    const [page, setPage] = useState<number>(1);

    // For pagination slicing
    const startIndex = (page - 1) * paginationValue;
    const endIndex = startIndex + paginationValue;

    // For pagination
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
                        {DeleteUserTableHeader.map((header, index) =>
                            (
                                <TableCell sx={{fontSize: "16px"}} key={index}>{header.label}</TableCell>
                            ) 
                        )}  
                    </TableRow>
                </TableHead>

                <TableBody>
                    {paginatedData.map((data, index) => 
                        (
                            <TableRow key={index} sx={{"&:hover": {backgroundColor: "rgb(230, 230, 230)"}}}>
                                <TableCell sx={{fontSize: "16px", "&:hover": {cursor: "pointer"}}}>{index + 1}</TableCell>
                                <ContentTableCell TableName={TableName} value={value} isAdmin={isAdmin} Information={data} >{data.username}</ContentTableCell>
                                <ContentTableCell TableName={TableName} value={value} isAdmin={isAdmin} Information={data}>{data.role}</ContentTableCell>
                                <ContentTableCell TableName={TableName} value={value} isAdmin={isAdmin} Information={data}>{data.gender}</ContentTableCell>
                                <ContentTableCell TableName={TableName} value={value} isAdmin={isAdmin} Information={data}>{TransferDateToString(data.deleteDetails?.startDate as Date)}</ContentTableCell>
                                <ContentTableCell TableName={TableName} value={value} isAdmin={isAdmin} Information={data}>{TransferDateToString(data.deleteDetails?.dueDate as Date)}</ContentTableCell>
                                {isAdmin && (<ActionTableCell value={value} TableName={TableName} Information={data} isAdmin={isAdmin}/>)}
                            </TableRow>
                        )
                    )}
                </TableBody>
            </Table>

            <Pagination
                sx={{ ...ItemToCenter, alignItems: "center", paddingTop: "10px" }}
                count={getCountPage() as number} // Total page count
                page={page} // Current page number
                onChange={handlePageChange} // On page change handler
            />
        </Fragment>
    );
}

export default DeleteUserTable
