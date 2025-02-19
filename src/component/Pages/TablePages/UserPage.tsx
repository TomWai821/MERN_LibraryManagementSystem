import { Box, Pagination, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from "@mui/material";
import { FC, useEffect, useState } from "react";

import { ChangePage, GetRole } from "../../../Controller/OtherController";
import UserFilter from "./Filter/UserFilter";
import { ItemToCenter, PageItemToCenter } from "../../../Maps/FormatSyntaxMaps";
import { UserDataInterface } from "../../../Model/TablePageModel";
import CustomTab from "../../UIFragment/Tab/CustomTab";
import { UserTabLabel } from "../../../Maps/TableMaps";
import UserTabPanel from "./Tabs/UserTabPanel";

const role = GetRole();
const isAdmin:boolean = (role === "Admin");

const UserData: UserDataInterface [] = 
[
    {username: "A", email: "ABC@gmail.com", role: "User", status: "Normal", gender: "Male"},
    {username: "B", email: "DEF@gmail.com", role: "User", status: "Normal", gender: "Female"},
    {username: "C", email: "GHI@gmail.com", role: "User", status: "Normal", gender: "Male"},
];

const SetTitle = isAdmin ? "User Management Page": "View BanList";

const UserPage:FC = () =>
{
    const [value, setValue] = useState(0);

    const changeValue = (newValue: number) =>
    {
        setValue(newValue);
    }

    useEffect(() => 
    {
        if(!isAdmin)
        {
            setValue(1);
        }
    })
    
    return(
        <Box sx={{ ...PageItemToCenter, flexDirection: 'column', padding: '0 50px'}}>
            <Typography sx={{fontSize: '24px'}}>{SetTitle}</Typography>

            <UserFilter isAdmin={isAdmin} value={value}/>

            <CustomTab isAdmin={isAdmin} value={value} valueChange={changeValue} tabLabel={UserTabLabel}/>

            <TableContainer sx={{ marginTop: 5 }} component={Paper}>
                <UserTabPanel value={value} isAdmin={isAdmin} userData={UserData}/>
            </TableContainer>
            <Pagination sx={{...ItemToCenter, alignItems: 'center', paddingTop: '10px'}} count={10}/>
        </Box>
    );
}

export default UserPage