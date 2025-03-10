import { FC, useEffect } from "react";
import { Box, Chip, Typography } from "@mui/material";

// Another useful function
import { ChangePage } from "../../Controller/OtherController";

// Model
import { PagesInterface } from "../../Model/TablePagesAndModalModel";


// Data (CSS Syntax)
import { PageItemToCenter } from "../../Maps/FormatSyntaxMaps";

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