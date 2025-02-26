import { Box, Pagination, Paper, TableContainer, Typography } from "@mui/material";
import { FC, useEffect, useState } from "react";

import UserFilter from "./Filter/UserFilter";
import { ItemToCenter, PageItemToCenter } from "../../../Maps/FormatSyntaxMaps";
import { PagesInterface, UserDataInterface } from "../../../Model/TablePageModel";
import CustomTab from "../../UIFragment/Tab/CustomTab";
import { PaginationOption, UserTabLabel } from "../../../Maps/TableMaps";
import UserTabPanel from "./Tabs/UserTabPanel";

const UserData: UserDataInterface [] = 
[
    {username: "A", email: "ABC@gmail.com", role: "User", status: "Normal", gender: "Male"},
    {username: "B", email: "DEF@gmail.com", role: "User", status: "Normal", gender: "Female"},
    {username: "C", email: "GHI@gmail.com", role: "User", status: "Normal", gender: "Male"},
];

const UserPage:FC<PagesInterface> = (loginData) =>
{
    const {isAdmin} = loginData;

    const [value, setValue] = useState(0);
    const [paginationValue, setPaginationValue] = useState(0);
    const SetTitle = isAdmin ? "User Management Page" : "View BanList";

    const changeValue = (type:string, newValue: number) =>
    {
        switch(type)
        {
            case "Tab":
                setValue(newValue);
                break;
            
            default:
                break;
        }
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

            <CustomTab isAdmin={isAdmin} value={value} valueChange={changeValue} paginationValue={paginationValue} tabLabel={UserTabLabel} paginationOption={PaginationOption}/>

            <TableContainer sx={{ marginTop: 5 }} component={Paper}>
                <UserTabPanel value={value} isAdmin={isAdmin} userData={UserData}/>
            </TableContainer>
            <Pagination sx={{...ItemToCenter, alignItems: 'center', paddingTop: '10px'}} count={10}/>
        </Box>
    );
}

export default UserPage