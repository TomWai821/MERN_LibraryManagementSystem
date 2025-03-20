import { FC, Fragment } from "react"
import { UserModalBody } from "../../../../Model/ModelForModal";
import { Avatar, Box, Typography } from "@mui/material";
import { displayAsColumn } from "../../../../Maps/FormatSyntaxMaps";
import { CalculateDuration, CountDuration, TransferDateToString } from "../../../../Controller/OtherController";
import { UserResultDataInterface } from "../../../../Model/ResultModel";

const BannedUserDataBody:FC<UserModalBody> = (BannedUserData) => 
{
    const {data, isAdmin} = BannedUserData;
    const Data = data as UserResultDataInterface;

    return(
        <Box sx={{...displayAsColumn, alignItems:'center', justifyContent: 'center'}}>
            <Avatar src={Data.avatarUrl ?? "/broken-image.jpg"} sx={{ width: "100px", height: "100px" }} />
            <Typography sx={{fontSize: '24px', padding: '15px'}}>{Data.role}</Typography>
            <Box sx={{ display: 'grid', gap: '20px 50px', gridTemplateColumns: '100%'}}>
                <Typography>Username: {Data.username}</Typography>
                {isAdmin && 
                    (
                        <Fragment>
                            <Typography>Email: {Data.email}</Typography>
                            <Typography>Gender: {Data.gender}</Typography>
                        </Fragment>
                    )
                }
                <Typography>Status: {Data.bannedDetails?.status}</Typography>
                {
                    Data.bannedDetails?.status === "Banned" && 
                    (
                        <Fragment>
                            <Typography>Description: {Data.bannedDetails?.description}</Typography>
                            <Typography>Date: {TransferDateToString(Data.bannedDetails?.startDate as Date)} - {TransferDateToString(Data.bannedDetails?.dueDate as Date)}</Typography>
                            <Typography>Duration: {CalculateDuration(Data.bannedDetails?.startDate as Date, Data.bannedDetails?.dueDate as Date)}</Typography>
                        </Fragment>
                    )
                }
                {
                    isAdmin && 
                    (
                        <Typography>Count: {CountDuration(Data.bannedDetails?.dueDate as Date)}</Typography>
                    )
                }
            </Box>
        </Box>
    );
}

export default BannedUserDataBody