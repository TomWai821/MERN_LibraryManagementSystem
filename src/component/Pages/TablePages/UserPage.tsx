import { Box, Pagination, Paper, TableContainer, Typography } from "@mui/material";
import { ChangeEvent, FC, useCallback, useEffect, useMemo, useState } from "react";

import UserFilter from "./Filter/UserFilter";
import { ItemToCenter, PageItemToCenter } from "../../../Maps/FormatSyntaxMaps";
import { PagesInterface } from "../../../Model/TablePageModel";
import CustomTab from "../../UIFragment/Tab/CustomTab";
import { PaginationOption, UserDataTableName, UserTabLabel } from "../../../Maps/TableMaps";
import UserTabPanel from "./Tabs/UserTabPanel";
import { GetCurrentDate } from "../../../Controller/OtherController";
import { useAllUserContext } from "../../../Context/User/AllUserContext";
import { useBannedUserContext } from "../../../Context/User/BannedUserContext";
import { useDeleteUserContext } from "../../../Context/User/DeleteUserContext";

const UserPage:FC<PagesInterface> = (loginData) =>
{
    const { AllUser, fetchUser } = useAllUserContext();
    const { BannedUser, fetchBannedUser } = useBannedUserContext();
    const { DeleteUser, fetchDeleteUser } = useDeleteUserContext();

    const UserData = [AllUser, BannedUser, DeleteUser];
    const { isAdmin } = loginData;
    const SetTitle = isAdmin ? "User Management Page" : "View BanList";

    const [searchUserData, setSearchUserData] = useState(
        { 
            user: { username: "", email: "", role: "", status: "", gender: "" },
            date: { startDate: GetCurrentDate("Date") as Date, dueDate: GetCurrentDate("Date") as Date } 
        }
    );

    // Reset data while tab is change
    const defaultSearchUser = {username: "", email:"", role:"", status:"", gender:""};
    const defaultsearchUserDate = {startDate: GetCurrentDate("Date") as Date, dueDate: GetCurrentDate("Date") as Date};

    const [tabValue, setTabValue] = useState(0);
    const [paginationValue, setPaginationValue] = useState(10);

    // useCallback could avoid unnecessary re-rendering
    const onChange = useCallback((event: ChangeEvent<HTMLInputElement>) => 
        {
            const { name, value } = event.target;
        
            setSearchUserData((prevState) => ({ ...prevState, user:{...prevState.user ,[name]: value } }));

        },[paginationValue]
    );

    const SearchUser = useCallback(() => 
        {
            switch(tabValue)
            {
                case 0:
                    fetchUser(searchUserData.user);
                    break;

                case 1:
                    fetchBannedUser(searchUserData.user, searchUserData.date);
                    break;

                case 2:
                    fetchDeleteUser(searchUserData.user, searchUserData.date);
                    break;
            }
            
        },[searchUserData.user, searchUserData.date]
    )

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
        },[]
    )

    useEffect(() => 
        { 
            if(!isAdmin) 
            { 
                setTabValue(1); 
            }
        },[isAdmin]
    )

    useEffect(() => 
        {
            // Reset while value change
            setSearchUserData({user:defaultSearchUser, date:defaultsearchUserDate});
        },[tabValue]
    )
    
    return(
        <Box sx={{ ...PageItemToCenter, flexDirection: 'column', padding: '0 50px'}}>
            <Typography sx={{fontSize: '24px'}}>{SetTitle}</Typography>

            <UserFilter isAdmin={isAdmin} value={tabValue} onChange={onChange} searchData={searchUserData.user} Search={SearchUser}/>

            <CustomTab isAdmin={isAdmin} value={tabValue} valueChange={changeValue} paginationValue={paginationValue} tabLabel={UserTabLabel} paginationOption={PaginationOption}/>

            <TableContainer sx={{ marginTop: 5 }} component={Paper}>
                <UserTabPanel value={tabValue} isAdmin={isAdmin} userData={UserData} paginationValue={paginationValue}/>
            </TableContainer>
        </Box>
    );
}

export default UserPage