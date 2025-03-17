import { FC, useEffect } from "react";
import { Box, Chip, IconButton, Tooltip, Typography } from "@mui/material";

// Another useful function
import { ChangePage } from "../../../Controller/OtherController";

// Context
import { useModal } from "../../../Context/ModalContext";
import { useDefinationContext } from "../../../Context/Book/DefinationContext";

// Model
import { PagesInterface } from "../../../Model/TablePagesAndModalModel";

// Data (CSS Syntax)
import { PageItemToCenter } from "../../../Maps/FormatSyntaxMaps";

const DefinitionPage:FC<PagesInterface>  = (loginData) => 
{
    const {isAdmin} = loginData;
    const {defination} = useDefinationContext();

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

            
        </Box>
    );
}

export default DefinitionPage