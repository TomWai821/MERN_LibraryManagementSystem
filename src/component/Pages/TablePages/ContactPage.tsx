import { Box, Paper, TableContainer, Typography } from "@mui/material";
import { ChangeEvent, FC, useCallback, useEffect, useState } from "react";

// Another Component
import UserFilter from "./Filter/UserFilter";
import CustomTab from "../../UIFragment/CustomTab";
import UserTabPanel from "./Tabs/UserTabPanel";

// Another Useful Function
import { ChangePage } from "../../../Controller/OtherController";

// Model
import { PagesInterface } from "../../../Model/TablePagesAndModalModel";

// Data (CSS Syntax and dropdown data)
import { PaginationOption, UserTabLabel } from "../../../Maps/TableMaps";
import { PageItemToCenter } from "../../../Maps/FormatSyntaxMaps";

const UserPage:FC<PagesInterface> = (loginData) =>
{
    const { isAdmin } = loginData;

    const [searchContactDetails, setsearchContactDetails] = useState(
        { 
            publisher:{},
            author:{}
        }
    );

    const [tabValue, setTabValue] = useState(0);
    const [paginationValue, setPaginationValue] = useState(10);

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
                ChangePage('/');
            }
        },[isAdmin]
    )

    return(
        <Box sx={{ ...PageItemToCenter, flexDirection: 'column', padding: '0 50px'}}>

            <CustomTab isAdmin={isAdmin} value={tabValue} valueChange={changeValue} paginationValue={paginationValue} tabLabel={UserTabLabel} paginationOption={PaginationOption}/>

        </Box>
    );
}

export default UserPage