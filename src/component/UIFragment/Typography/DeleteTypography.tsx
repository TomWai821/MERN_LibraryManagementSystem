import { FC } from "react";

import { Typography } from "@mui/material"

import WarningAmberIcon from '@mui/icons-material/WarningAmber';

import { DeleteButton } from "../../../Maps/FormatSyntaxMaps";


const DeleteTypography:FC = () => 
{
    return( 
        <Typography sx={{display:'flex', alignContent: 'center', color: DeleteButton.backgroundColor, paddingBottom: '30px'}}>
            <WarningAmberIcon/>Warning: This Action could not be undo
        </Typography>
    )
}

export default DeleteTypography;