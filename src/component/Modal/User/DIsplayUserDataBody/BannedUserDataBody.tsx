import { FC, Fragment } from "react"
import { UserModalBody } from "../../../../Model/ModelForModal";
import { Avatar, Box, Typography } from "@mui/material";
import { displayAsColumn } from "../../../../Maps/FormatSyntaxMaps";
import { CalculateDuration, CountDuration, TransferDateToString } from "../../../../Controller/OtherController";

const BannedUserDataBody:FC<UserModalBody> = (BannedUserData) => 
{
    const {data, isAdmin} = BannedUserData;

    return(
        <Box sx={{...displayAsColumn, alignItems:'center', justifyContent: 'center'}}>
            <Avatar src={data.avatarUrl ?? "/broken-image.jpg"} sx={{ width: "100px", height: "100px" }} />
            <Typography sx={{fontSize: '24px', padding: '15px'}}>{data.role}</Typography>
            <Box sx={{ display: 'grid', gap: '20px 50px', gridTemplateColumns: '100%'}}>
                <Typography>Username: {data.username}</Typography>
                {isAdmin && 
                (
                    <Fragment>
                        <Typography>Email: {data.email}</Typography>
                        <Typography>Gender: {data.gender}</Typography>
                    </Fragment>
                )
                }
                <Typography>Status: {data.bannedDetails?.status}</Typography>
                {
                    data.bannedDetails?.status === "Banned" && 
                    (
                        <Fragment>
                            <Typography>Description: {data.bannedDetails?.description}</Typography>
                            <Typography>Date: {TransferDateToString(data.bannedDetails?.startDate as Date)} - {TransferDateToString(data.bannedDetails?.dueDate as Date)}</Typography>
                            <Typography>Duration: {CalculateDuration(data.bannedDetails?.startDate as Date, data.bannedDetails?.dueDate as Date)}</Typography>
                            <Typography>Count: {CountDuration(data.bannedDetails?.dueDate as Date)}</Typography>
                        </Fragment>
                    )
                }
            </Box>
        </Box>
    );
}

export default BannedUserDataBody