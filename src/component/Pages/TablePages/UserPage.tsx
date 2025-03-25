import { Box, Paper, TableContainer, Typography } from "@mui/material";
import { ChangeEvent, FC, useCallback, useEffect, useState } from "react";

// Another Component
import UserFilter from "./Filter/UserFilter";
import CustomTab from "../../UIFragment/CustomTab";
import UserTabPanel from "./Tabs/UserTabPanel";

// Model
import { PagesInterface } from "../../../Model/TablePagesAndModalModel";

// Contexts
import { useUserContext } from "../../../Context/User/UserContext";

// Data (CSS Syntax and dropdown data)
import { PaginationOption, UserTabLabel } from "../../../ArraysAndObjects/TableArrays";
import TableTitle from "../../UIFragment/TableTitle";
import { PageItemToCenter } from "../../../ArraysAndObjects/FormatSyntaxObjects";

const UserPage:FC<PagesInterface> = (loginData) =>
{
    const { isAdmin } = loginData;
    const { userData, fetchUser } = useUserContext();

    const SetTitle = isAdmin ? "User Management Page" : "View BanList";

    const [searchUserData, setSearchUserData] = useState({ username: "", email: "", role: "All", status: "All", gender: "All" });
    const [tabValue, setTabValue] = useState(0);
    const [paginationValue, setPaginationValue] = useState(10);

    // Reset data while tab is change
    const defaultSearchUser = {username: "", email:"", role:"All", status:"All", gender:"All"};

    // useCallback could avoid unnecessary re-rendering
    const onChange = useCallback((event: ChangeEvent<HTMLInputElement>) => 
    {
        const { name, value } = event.target;
        setSearchUserData({ ...searchUserData, [name]: value });
    }
    ,[paginationValue]);

    const SearchUser = useCallback(() => 
    {
        const TableName = ["AllUser", "BannedUser", "DeleteUser"];
        fetchUser(TableName[tabValue], searchUserData);
    }
    ,[searchUserData])

    const changeValue = useCallback((type:string, newValue: number) =>
    {
        switch(type)
        {
            case "Tab":
                setTabValue(newValue);
                break;

            case "Pagination":
                setPaginationValue(newValue);
                break;
            
            default:
                break;
        }
    },[])

    useEffect(() => 
    { 
        if(!isAdmin) 
        { 
            setTabValue(1); 
        }
    },[isAdmin])

    useEffect(() => 
    {
        // Reset while value change
        setSearchUserData(defaultSearchUser);
    },[tabValue])
    
    return(
        <Box sx={{ ...PageItemToCenter, flexDirection: 'column', padding: '0 50px'}}>
            <TableTitle title={SetTitle} dataLength={userData[tabValue].length}/>

            <UserFilter isAdmin={isAdmin} value={tabValue} onChange={onChange} searchData={searchUserData} Search={SearchUser}/>

            <CustomTab isAdmin={isAdmin} value={tabValue} valueChange={changeValue} paginationValue={paginationValue} tabLabel={UserTabLabel} paginationOption={PaginationOption}/>

            <TableContainer sx={{ marginTop: 5 }} component={Paper}>
                <UserTabPanel value={tabValue} isAdmin={isAdmin} userData={userData} paginationValue={paginationValue}/>
            </TableContainer>
        </Box>
    );
}

export default UserPage