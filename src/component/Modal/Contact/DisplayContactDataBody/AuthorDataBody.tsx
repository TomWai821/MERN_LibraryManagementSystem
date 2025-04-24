import { FC } from "react"
import { DisplayDataModalBody } from "../../../../Model/ModelForModal"
import { Box, Typography } from "@mui/material";

import { displayAsColumn } from "../../../../ArraysAndObjects/FormatSyntaxObjects";
import { ContactInterface } from "../../../../Model/ResultModel";

const AuthorDataBody:FC<DisplayDataModalBody> = (contactData) => 
{
    const {data} = contactData;
    const authorData = data as ContactInterface;

    const AuthorData: Record<string,{label:string, data:any}> = 
    {
        "name": {label: "Name", data:authorData.author},
        "email": {label: "Email", data:authorData.email},
        "phoneNumber": {label: "Phone number", data:authorData.phoneNumber},
    };

    return(
        <Box sx={{...displayAsColumn}}>
            <Box sx={{ display: 'grid', gap: '20px 50px'}}>
                {
                    Object.entries(AuthorData).map(([key, data], index) => 
                        (
                            <Typography>{data.label}: {data.data}</Typography>
                        )
                    )
                }
            </Box>
        </Box>
    );
}

export default AuthorDataBody