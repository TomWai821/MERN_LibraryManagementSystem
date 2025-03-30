import { FC } from "react"
import { Avatar, Box, Divider, Typography } from "@mui/material";

import {  CountDuration, TransferDateToString } from "../../../../Controller/OtherController";
import { DisplayDataModalBody } from "../../../../Model/ModelForModal";
import { UserResultDataInterface } from "../../../../Model/ResultModel";
import { displayAsColumn } from "../../../../ArraysAndObjects/FormatSyntaxObjects";

const DeleteUserDataBody:FC<DisplayDataModalBody>  = (DeleteUserData) => 
{
    const {data} = DeleteUserData;
    const Data = data as UserResultDataInterface;

    return(
        <Box sx={{...displayAsColumn, alignItems:'center', justifyContent: 'center'}}>
        <Avatar src={Data.avatarUrl ?? "/broken-image.jpg"} sx={{ width: "100px", height: "100px" }} />
        <Typography sx={{fontSize: '24px', padding: '15px'}}>{Data.role}</Typography>
        <Box sx={{ display: 'grid', paddingTop: '30px', gap: '20px 50px', gridTemplateColumns: '100%'}}>
            <Typography>Username: {Data.username}</Typography>
            <Typography>Email: {Data.email}</Typography>
            <Typography>Gender: {Data.gender}</Typography>
            <Typography>Description: {Data.deleteDetails?.description}</Typography>
            <Typography>Start Date: {TransferDateToString(Data.deleteDetails?.startDate as Date)}</Typography>
            <Typography>Due Date: {TransferDateToString(Data.deleteDetails?.dueDate as Date)}</Typography>
            <Typography>Count: {CountDuration(Data.deleteDetails?.dueDate as Date)}</Typography>
        </Box>
    </Box>
    );
}

export default DeleteUserDataBody