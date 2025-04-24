import { FC } from "react"
import { DisplayDataModalBody } from "../../../../Model/ModelForModal"
import { Box, Typography } from "@mui/material";

import { displayAsColumn } from "../../../../ArraysAndObjects/FormatSyntaxObjects";
import { ContactInterface } from "../../../../Model/ResultModel";

const PublisherDataBody:FC<DisplayDataModalBody> = (contactData) => 
{
    const {data} = contactData;
    const publisherData = data as ContactInterface;

    const PublisherData: Record<string,{label:string, data:any}> = 
    {
        "name": {label: "Name", data:publisherData.publisher},
        "email": {label: "Email", data:publisherData.email},
        "phoneNumber": {label: "Phone number", data:publisherData.phoneNumber},
        "address": {label: "Address", data:publisherData.address}
    };

    return(
        <Box sx={{...displayAsColumn}}>
            <Box sx={{ display: 'grid', gap: '20px 50px', width:'350px', gridTemplateColumns: '100%'}}>
                {
                    Object.entries(PublisherData).map(([key, data], index) => 
                        (
                            <Typography>{data.label}: {data.data}</Typography>
                        )
                    )
                }
            </Box>
        </Box>
    );
}

export default PublisherDataBody