import { Pagination, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import ContentTableCell from "../../../UIFragment/TableCell/ContentTableCell";
import ActionTableCell from "../../../Manager/ActionTableCellManager";
import { DeleteUserTableHeader } from "../../../../Maps/TableMaps";
import { FC, Fragment, useState } from "react";
import { UserDataTableInterface } from "../../../../Model/TablePageModel";
import { ItemToCenter } from "../../../../Maps/FormatSyntaxMaps";
import { TransferDateToString } from "../../../../Controller/OtherController";

const DeleteUserDataTable:FC<UserDataTableInterface> = ({isAdmin, value, userData, paginationValue}) => 
{
    const currentTableData = userData[value];
    const [page, setPage] = useState<number>(1);

    const startIndex = (page - 1) * paginationValue;
    const endIndex = startIndex + paginationValue;

    const paginatedData = currentTableData.slice(startIndex, endIndex);
    const count = Math.ceil(userData.length / paginationValue);

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
                                <TableCell key={index}>{header.label}</TableCell>
                            ) 
                        )}  
                    </TableRow>
                </TableHead>

                <TableBody>
                    {paginatedData.map((data, index) => 
                        (
                            <TableRow key={index} sx={{"&:hover": {backgroundColor: "rgb(230, 230, 230)"}}}>
                                <TableCell sx={{"&:hover": {cursor: "pointer"}}}>{index + 1}</TableCell>
                                <ContentTableCell>{data.username}</ContentTableCell>
                                <ContentTableCell>{data.email}</ContentTableCell>
                                <ContentTableCell>{data.role}</ContentTableCell>
                                <ContentTableCell>{data.gender}</ContentTableCell>
                                <ContentTableCell>{TransferDateToString(data.deleteDetails?.startDate)}</ContentTableCell>
                                <ContentTableCell>{TransferDateToString(data.deleteDetails?.dueDate)}</ContentTableCell>
                                {isAdmin && (<ActionTableCell value={value} TableName={"User"} Information={data} isAdmin={isAdmin}/>)}
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

export default DeleteUserDataTable
