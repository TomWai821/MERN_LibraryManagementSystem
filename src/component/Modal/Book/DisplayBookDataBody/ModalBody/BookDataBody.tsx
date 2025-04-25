import { FC } from "react";
import { Box, IconButton, Typography } from "@mui/material";
import { BookDescriptionDisplayFormat, displayAsRow } from "../../../../../ArraysAndObjects/FormatSyntaxObjects";

import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import { BookDataBodyInterface } from "../../../../../Model/ModelForModal";

const BookDataBody:FC<BookDataBodyInterface> = (bookBodyData) => 
{
    const {BookData, isLoggedIn, status, toggleDescriptionDisplay, descriptionData, displayFullDescription, displayAmount, overFlow, descriptionRef, lineCount} = bookBodyData;
      
    return(
            <Box sx={{ display: 'grid', gap: '20px 50px', width:'350px', gridTemplateColumns: '100%'}}>
                {
                    Object.entries(BookData).map(([key, value], index) => 
                        (
                            <Typography key={index}>{value.label}: {value.value}</Typography>
                        )
                    )
                }
                
                {
                    isLoggedIn &&
                    <Box sx={{ width:'350px', display: 'inline-block'}}>
                        <Typography>Status: {status}</Typography>
                    </Box>
                }
                <Box sx={{ maxWidth: '350px', display: 'inline-block'}}>
                    <Box sx={{...displayAsRow, alignItems: 'center'}}>
                        <Typography>Description:</Typography>
                        {lineCount > 4 && 
                            (
                            <IconButton onClick={toggleDescriptionDisplay}>
                                {displayFullDescription ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
                            </IconButton>
                            )
                        }
                    </Box>
                    <Typography ref={descriptionRef} sx={{...BookDescriptionDisplayFormat, WebkitLineClamp: displayAmount, overflow: overFlow}}>{descriptionData}</Typography>
                </Box>
            </Box>
    );
}

export default BookDataBody