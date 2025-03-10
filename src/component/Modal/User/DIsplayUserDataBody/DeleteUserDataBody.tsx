import { FC, Fragment } from "react"
import { UserModalBody } from "../../../../Model/ModelForModal";
import { Avatar, Box, Typography } from "@mui/material";
import { displayAsColumn } from "../../../../Maps/FormatSyntaxMaps";
import {  CountDuration, TransferDateToString } from "../../../../Controller/OtherController";

const DeleteUserDataBody:FC<UserModalBody>  = (DeleteUserData) => 
{
    const {data} = DeleteUserData;

    return(
        <Box sx={{...displayAsColumn, alignItems:'center', justifyContent: 'center'}}>
        <Avatar src={data.avatarUrl ?? "/broken-image.jpg"} sx={{ width: "100px", height: "100px" }} />
        <Typography sx={{fontSize: '24px', padding: '15px'}}>{data.role}</Typography>
        <Box sx={{ display: 'grid', paddingTop: '30px', gap: '20px 50px', gridTemplateColumns: '100%'}}>
            <Typography>Username: {data.username}</Typography>
            <Typography>Email: {data.email}</Typography>
            <Typography>Gender: {data.gender}</Typography>
            <Typography>Status: {data.status} ({data.deleteDetails?.status})</Typography>
            {
                data.status === "Pending" && 
                (
                    <Fragment>
                        <Typography>Due Date: {TransferDateToString(data.deleteDetails?.dueDate as Date)}</Typography>
                        <Typography>Count: {CountDuration(data.deleteDetails?.dueDate as Date)}</Typography>
                    </Fragment>
                )
            }
        </Box>
    </Box>
    );
}

export default DeleteUserDataBody