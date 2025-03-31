import { FC } from "react"
import { FilterInterface } from "../../../../Model/TablePagesAndModalModel"
import { Box, TextField, Button, MenuItem } from "@mui/material";
import { ItemToCenter } from "../../../../ArraysAndObjects/FormatSyntaxObjects";
import { SelfLoanBookSearchInterface } from "../../../../Model/BookTableModel";
import { LoanBookStatusOption } from "../../../../ArraysAndObjects/TableArrays";

const RecordFilter:FC<FilterInterface> = (filterData) => 
{
    const {searchData, onChange, Search} = filterData;
    const Data = searchData as SelfLoanBookSearchInterface;

    return(
        <Box sx={{ padding: '25px 15%' }}>
            <Box sx={{ ...ItemToCenter, paddingBottom: '25px', alignItems: 'center' }}>
               
                <TextField label="Book Name" name="bookname" value={Data.bookname} onChange={onChange} size="small" sx={{ width: '50%', paddingRight: '10px' }}/>
                <TextField label="Status" name="status" value={Data.status} onChange={onChange} size="small" sx={{ width: '20%' }} select>
                    { 
                        LoanBookStatusOption.map((option, index) => 
                        (
                            <MenuItem key={index} value={option}>{option}</MenuItem>
                        ))
                    }
                </TextField>

                <Button variant='contained' sx={{marginLeft: '10px'}} onClick={Search}>Search</Button>
            </Box>
        </Box>
    );
}

export default RecordFilter