import { Box } from "@mui/material"
import { FC } from "react"
import { PageItemToCenter } from "../../../ArraysAndObjects/FormatSyntaxObjects"
import TableTitle from "../../UIFragment/TableTitle";

const placeholder = [];

const SelfLoanRecordPage:FC = () => 
{
    return(
        <Box sx={{ ...PageItemToCenter, flexDirection: 'column', padding: '0 50px'}}>
            <TableTitle title={"Loan Records"} dataLength={placeholder.length}/>
        </Box>
    )
}

export default SelfLoanRecordPage