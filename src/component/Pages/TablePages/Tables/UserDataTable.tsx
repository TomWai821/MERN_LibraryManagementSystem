import { Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import ContentTableCell from "../../../UIFragment/TableCell/ContentTableCell";
import ActionTableCell from "../../../UIFragment/TableCell/ActionTableCell";
import { UserTableHeader } from "../../../../Maps/TableMaps";
import { FC } from "react";
import { UserDataTableInterface } from "../../../../Model/TablePageModel";

const UserDataTable:FC<UserDataTableInterface> = ({isAdmin, userData}) => 
{
    return(
        <Table>
            <TableHead>
                <TableRow>
                    {UserTableHeader.map((header, index) =>
                        (
                            <TableCell key={index}>{header.label}</TableCell>
                        ) 
                    )}  
                </TableRow>
            </TableHead>

            <TableBody>
                {userData.map((data, index) => 
                    (
                        <TableRow key={index} sx={{"&:hover": {backgroundColor: "rgb(230, 230, 230)"}}}>
                            <TableCell sx={{"&:hover": {cursor: "pointer"}}}>{index + 1}</TableCell>
                            <ContentTableCell>{data.username}</ContentTableCell>
                            <ContentTableCell>{data.email}</ContentTableCell>
                            <ContentTableCell>{data.role}</ContentTableCell>
                            <ContentTableCell>{data.status}</ContentTableCell>
                            <ContentTableCell>{data.gender}</ContentTableCell>
                            {isAdmin ? 
                                <ActionTableCell TableName={"User"} Information={data} isAdmin={isAdmin}/> : <></>
                            }
                        </TableRow>
                    )
                )}
            </TableBody>
        </Table>
    );
}

export default UserDataTable
