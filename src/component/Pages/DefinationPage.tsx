import { Box, Chip, Typography } from "@mui/material";
import { PageItemToCenter } from "../../Maps/FormatSyntaxMaps";
import { FC, useEffect } from "react";
import { PagesInterface } from "../../Model/TablePageModel";
import { ChangePage } from "../../Controller/OtherController";

const DefinitionPage:FC<PagesInterface>  = (loginData) => 
{
    const {isAdmin} = loginData;

    useEffect(() => 
    {
        if(!isAdmin)
        {
            ChangePage('/');
        }
    },[isAdmin])

    return(
        <Box sx={{ ...PageItemToCenter, flexDirection: 'column', padding: '0 50px'}}>
            <Typography sx={{fontSize: '24px'}}>Manage Defination</Typography>

            <Box sx={{ paddingTop: '50px' }}>
                <Typography sx={{fontSize: '24px'}}>Language</Typography>
                <Chip label="English (EN)" variant="outlined"/>
                <Chip label="Traditional Chinese (TC)" variant="outlined"/>
                <Chip label="Simplified Chinese (SC)" variant="outlined"/>
            </Box>
        </Box>
    );
}

export default DefinitionPage