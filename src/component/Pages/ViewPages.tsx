import { Box, Paper, Typography } from "@mui/material";
import { FC, useEffect } from 'react'
import { DataType } from "../../Model/TableModel";

const ViewPages:FC<DataType> = ({dataType}) =>
{
    useEffect(() => 
    {

    })

    return(
        <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 5}}>
            <Typography>{dataType} Page</Typography>
            
            <Paper>
                
            </Paper>
        </Box>
    )
}

export default ViewPages;