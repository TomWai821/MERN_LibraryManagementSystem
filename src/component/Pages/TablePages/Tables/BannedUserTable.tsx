import { FC, Fragment, useState } from "react";

import { Pagination, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";

// UI Fragment and Manager
import ContentTableCell from "../../../UIFragment/TableCell/ContentTableCell";
import ActionTableCell from "../../../Manager/ActionTableCellManager";

// Model
import { UserDataTableInterface } from "../../../../Model/UserTableModel";

// Data (CSS Syntax and table header)
import { ItemToCenter } from "../../../../Maps/FormatSyntaxMaps";
import { BannedUserTableHeader } from "../../../../Maps/TableMaps";


const BannedUserTable:FC<UserDataTableInterface> = (DataForBannedUserTable) => 
{
    const {isAdmin, value, userData, paginationValue} = DataForBannedUserTable;

    const currentTableData = userData[value];
    const BannedData = isAdmin ? currentTableData : currentTableData.filter((data) => data.bannedDetails?.status === "Banned");

    const [page, setPage] = useState<number>(1);

    const startIndex = (page - 1) * paginationValue;
    const endIndex = startIndex + paginationValue;

    const paginatedData = BannedData.slice(startIndex, endIndex);
    const count = Math.ceil(userData.length / paginationValue);

    const getCountPage = () : void | number => 
    {
        return BannedData.length > paginationValue ? count + 1 : count;
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
                        {BannedUserTableHeader.map((header, index) =>
                            (
                                <TableCell key={index}>{header.label}</TableCell>
                            ) 
                        )}  
                    </TableRow>
                </TableHead>

                <TableBody>
                    {paginatedData.map((data, index) => 
                        {
                            if(data.bannedDetails?.status === "Banned")
                            {
                                return(
                                    <TableRow key={index} sx={{"&:hover": {backgroundColor: "rgb(230, 230, 230)"}}}>
                                        <TableCell sx={{"&:hover": {cursor: "pointer"}}}>{index + 1}</TableCell>
                                        <ContentTableCell>{data.username}</ContentTableCell>
                                        <ContentTableCell>{data.role}</ContentTableCell>
                                        <ContentTableCell>{data.gender}</ContentTableCell>
                                        <ContentTableCell>{data.bannedDetails?.description}</ContentTableCell>
                                        <ContentTableCell>{data.bannedDetails?.status}</ContentTableCell>
                                        {isAdmin && (<ActionTableCell value={value} TableName={"User"} Information={data} isAdmin={isAdmin}/>)}
                                    </TableRow>
                                )
                            }
                        }
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

export default BannedUserTable
