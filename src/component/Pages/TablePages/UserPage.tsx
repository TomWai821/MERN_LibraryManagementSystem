import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from "@mui/material";
import { FC, useEffect, useState } from "react";

import { ChangePage, GetRole } from "../../../Controller/OtherController";
import UserFilter from "./Filter/UserFilter";
import { PageItemToCenter } from "../../../Maps/FormatSyntaxMaps";
import { UserTableHeader } from "../../../Maps/TableMaps";
import { UserDataInterface } from "../../../Model/TablePageModel";
import ContentTableCell from "./TableCell/ContentTableCell";
import ActionTableCell from "./TableCell/ActionTableCell";

const role = GetRole();
const isAdmin:boolean = (role === "Admin");

const UserData: UserDataInterface [] = 
[
    {username: "A", email: "ABC@gmail.com", role: "User", status: "Normal", gender: "Male"},
    {username: "B", email: "DEF@gmail.com", role: "User", status: "Normal", gender: "Female"},
    {username: "C", email: "GHI@gmail.com", role: "User", status: "Normal", gender: "Male"},
];

const UserPage:FC = () =>
{
    const [searchUser, setSearchUser] = useState();

    useEffect(() => 
    {
        if(!isAdmin)
        {
            ChangePage("/");
        }
    })
    
    return(
        <Box sx={{ ...PageItemToCenter, flexDirection: 'column', padding: '0 50px'}}>
            <Typography sx={{fontSize: '24px'}}>User Management Page</Typography>

            <UserFilter isAdmin={isAdmin}/>

            <TableContainer sx={{ marginTop: 5 }} component={Paper}>
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
                        {UserData.map((data, index) => 
                            (
                                <TableRow key={index} sx={{"&:hover": {backgroundColor: "rgb(230, 230, 230)"}}}>
                                    <TableCell sx={{"&:hover": {cursor: "pointer"}}}>{index + 1}</TableCell>
                                    <ContentTableCell>{data.username}</ContentTableCell>
                                    <ContentTableCell>{data.email}</ContentTableCell>
                                    <ContentTableCell>{data.role}</ContentTableCell>
                                    <ContentTableCell>{data.status}</ContentTableCell>
                                    <ContentTableCell>{data.gender}</ContentTableCell>
                                    <ActionTableCell TableName={"User"} Information={data} isAdmin={isAdmin}/>
                                </TableRow>
                            )
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
}

export default UserPage