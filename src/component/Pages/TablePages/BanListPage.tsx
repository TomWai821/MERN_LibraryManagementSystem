
import { FC } from "react";

import { Box, Typography } from "@mui/material";
import { PageItemToCenter } from "../../../Model/UIRenderingModel/FormatSyntaxModel";

const BanListPage:FC = () =>
{
    return(
        <Box sx={PageItemToCenter}>
            <Typography>Ban List</Typography>
        </Box>
    );
}

export default BanListPage