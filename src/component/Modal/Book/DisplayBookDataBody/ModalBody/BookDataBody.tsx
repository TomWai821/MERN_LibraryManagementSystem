import { FC } from "react";
import { Box, Typography } from "@mui/material";
import { BookDataBodyInterface } from "../../../../../Model/ModelForModal";

import ExpandableTypography from "../../../../UIFragment/ExpandableTypography";
import { useAuthContext } from "../../../../../Context/User/AuthContext";

const BookDataBody:FC<BookDataBodyInterface> = (bookBodyData) => 
{
    const {IsLoggedIn} = useAuthContext();
    const {BookData, status, descriptionData} = bookBodyData;
      
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
                    IsLoggedIn() &&
                    <Box sx={{ width:'350px', display: 'inline-block'}}>
                        <Typography>Status: {status}</Typography>
                    </Box>
                }
                
                <ExpandableTypography title={"Description"}>{descriptionData}</ExpandableTypography>
            </Box>
    );
}

export default BookDataBody