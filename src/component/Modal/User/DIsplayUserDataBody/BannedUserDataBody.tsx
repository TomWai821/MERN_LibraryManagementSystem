import { FC, Fragment } from "react"
import { DisplayDataModalBody } from "../../../../Model/ModelForModal";
import { Avatar, Box, Typography } from "@mui/material";
import { CalculateDuration, CountDuration, TransferDateToString } from "../../../../Controller/OtherController";
import { UserResultDataInterface } from "../../../../Model/ResultModel";
import { displayAsColumn } from "../../../../ArraysAndObjects/FormatSyntaxObjects";
import { useAuthContext } from "../../../../Context/User/AuthContext";

const BannedUserDataBody:FC<DisplayDataModalBody> = (BannedUserData) => 
{
    const {data} = BannedUserData;
    const {IsAdmin} = useAuthContext();
    const Data = data as UserResultDataInterface;

    return(
        <Box sx={{...displayAsColumn, alignItems:'center', justifyContent: 'center'}}>
            <Avatar src={Data.avatarUrl ?? "/broken-image.jpg"} sx={{ width: "100px", height: "100px" }} />
            <Typography sx={{fontSize: '24px', padding: '15px'}}>{Data.role}</Typography>
            <Box sx={{ display: 'grid', gap: '20px 50px', gridTemplateColumns: '100%'}}>
                <Typography>Username: {Data.username}</Typography>
                {
                    IsAdmin() && 
                    (
                        <Fragment>
                            <Typography>Email: {Data.email}</Typography>
                            <Typography>Gender: {Data.gender}</Typography>
                        </Fragment>
                    )
                }
                <Fragment>
                    <Typography>Description: {Data.bannedDetails?.description}</Typography>
                    <Typography>Date: {TransferDateToString(Data.bannedDetails?.startDate as Date)} - {TransferDateToString(Data.bannedDetails?.dueDate as Date)}</Typography>
                    <Typography>Duration: {CalculateDuration(Data.bannedDetails?.startDate as Date, Data.bannedDetails?.dueDate as Date)}</Typography>
                </Fragment>
                {
                    IsAdmin() && 
                    (
                        <Fragment>
                            <Typography>Count: {CountDuration(Data.bannedDetails?.dueDate as Date)}</Typography>
                        </Fragment>
                    )
                }
            </Box>
        </Box>
    );
}

export default BannedUserDataBody