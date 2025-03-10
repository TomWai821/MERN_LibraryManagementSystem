import { FC } from "react"
import { UserModalBody } from "../../../../Model/ModelForModal"
import { Avatar, Box, Typography } from "@mui/material";
import { displayAsColumn} from "../../../../Maps/FormatSyntaxMaps";
import { CalculateDuration } from "../../../../Controller/OtherController";

const AllUserDataBody:FC<UserModalBody> = (AllUserData) => 
{
    const {data} = AllUserData;

    return(
        <Box sx={{...displayAsColumn, alignItems:'center', justifyContent: 'center'}}>
            <Avatar src={data.avatarUrl ?? "/broken-image.jpg"} sx={{ width: "100px", height: "100px" }} />
            <Typography sx={{fontSize: '24px', padding: '15px'}}>{data.role}</Typography>
            <Box sx={{ display: 'grid', gap: '20px 50px', gridTemplateColumns: '100%'}}>
                <Typography>Username: {data.username}</Typography>
                <Typography>Email: {data.email}</Typography>
                <Typography>Status: {data.status}</Typography>
                <Typography>Gender: {data.gender}</Typography>
            </Box>
        </Box>
    );
}

export default AllUserDataBody