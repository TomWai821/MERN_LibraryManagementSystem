import { Pagination, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import ContentTableCell from "../../../UIFragment/TableCell/ContentTableCell";
import ActionTableCell from "../../../UIFragment/TableCell/ActionTableCell";
import { BannedUserTableHeader } from "../../../../Maps/TableMaps";
import { FC, Fragment, useState } from "react";
import { UserDataTableInterface } from "../../../../Model/TablePageModel";
import { ItemToCenter } from "../../../../Maps/FormatSyntaxMaps";
import { TransferDateToString } from "../../../../Controller/OtherController";

const BannedUserDataTable:FC<UserDataTableInterface> = ({isAdmin, value, userData, paginationValue}) => 
{
    const currentTableData = userData[value];
    const [page, setPage] = useState<number>(1);
    const rowsPerPage = paginationValue;

    const startIndex = (page - 1) * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;

    const paginatedData = userData.slice(startIndex, endIndex);

    const handlePageChange = (_: React.ChangeEvent<unknown>, newPage: number) => {
        setPage(newPage);
    };

    return(
        <Fragment>
            <Table>
                <TableHead>
                    <TableRow>
                        {BannedUserTableHeader.map((header, index) =>
                            (
                                <TableCell key={index}>{header.label}</TableCell>
                            ) 
                        )}  
                    </TableRow>
                </TableHead>

                <TableBody>
                    {currentTableData.map((data, index) => 
                        (
                            <TableRow key={index} sx={{"&:hover": {backgroundColor: "rgb(230, 230, 230)"}}}>
                                <TableCell sx={{"&:hover": {cursor: "pointer"}}}>{index + 1}</TableCell>
                                <ContentTableCell>{data.username}</ContentTableCell>
                                <ContentTableCell>{data.email}</ContentTableCell>
                                <ContentTableCell>{data.role}</ContentTableCell>
                                <ContentTableCell>{data.gender}</ContentTableCell>
                                <ContentTableCell>{TransferDateToString(data.bannedDetails?.startDate)}</ContentTableCell>
                                <ContentTableCell>{TransferDateToString(data.bannedDetails?.dueDate)}</ContentTableCell>
                                {isAdmin ? 
                                    <ActionTableCell TableName={"User"} Information={data} isAdmin={isAdmin}/> : <></>
                                }
                            </TableRow>
                        )
                    )}
                </TableBody>
            </Table>

            <Pagination
                sx={{ ...ItemToCenter, alignItems: "center", paddingTop: "10px" }}
                count={Math.ceil(userData.length / rowsPerPage)} // Total page count
                page={page} // Current page number
                onChange={handlePageChange} // On page change handler
            />
        </Fragment>
    );
}

export default BannedUserDataTable
