import { FC, Fragment, useEffect, useState } from "react"
import { FilterInterface } from "../../../../Model/TablePagesAndModalModel"
import { Box, TextField, Button, MenuItem, IconButton } from "@mui/material";
import { ItemToCenter } from "../../../../ArraysAndObjects/FormatSyntaxObjects";
import { SelfLoanBookSearchInterface } from "../../../../Model/BookTableModel";
import { AllBookStatusOption, LoanBookStatusOption } from "../../../../ArraysAndObjects/TableArrays";
import { useDefinitionContext } from "../../../../Context/Book/DefinitionContext";
import { useContactContext } from "../../../../Context/Book/ContactContext";

import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';

import OptionFields from "../../../Manager/OptionFieldsManager";

const RecordFilter:FC<FilterInterface> = (filterData) => 
{
    const {value, searchData, onChange, Search} = filterData;
    const Data = searchData as SelfLoanBookSearchInterface;

    const [optionVisiable, setOptionVisiable] = useState(false);

    const toggleCardVisibility = () => 
    {
        setOptionVisiable((prev) => !prev);
    };



    return(
        <Box sx={{ padding: '25px 15%' }}>
            <Box sx={{ ...ItemToCenter, paddingBottom: '25px', alignItems: 'center' }}>
               
                <TextField label="Book Name" name="bookname" value={Data.bookname} onChange={onChange} size="small" sx={{ width: '55%', paddingRight: '10px' }}/>
                {
                    value === 0 ?
                    <TextField label="Status" name="status" value={Data.status} onChange={onChange} size="small" sx={{ width: '15%' }} select>
                        { 
                            LoanBookStatusOption.map((option, index) => 
                            (
                                <MenuItem key={index} value={option}>{option}</MenuItem>
                            ))
                        }
                    </TextField>
                    :
                    <Fragment>
                        <TextField label="Status" name="status" value={Data.status} onChange={onChange} size="small" sx={{ width: '15%' }} select>
                        {
                            AllBookStatusOption.map((option, index) => 
                                (
                                    <MenuItem key={index} value={option}>{option}</MenuItem>
                                )
                            )
                        }
                        </TextField>

                        <IconButton onClick={toggleCardVisibility}>
                            {optionVisiable ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
                        </IconButton>
                    </Fragment>

                }
                
                <Button variant='contained' sx={{marginLeft: '10px'}} onClick={Search}>Search</Button>
            </Box>

            <OptionFields value={value} type={"Record"} optionVisiable={optionVisiable} onChange={onChange} searchData={searchData}/>
        </Box>
    );
}

export default RecordFilter