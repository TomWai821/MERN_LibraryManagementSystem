import { Box, Button, MenuItem, TextField, Typography } from "@mui/material"
import ModalTemplate from "../../Templates/ModalTemplate"
import { DeleteButton, ModalBodySyntax } from "../../../Maps/FormatSyntaxMaps"
import { FC, useState } from "react";
import { UserDataInterface } from "../../../Model/TablePageModel";

const BanUserModal:FC<UserDataInterface> = ({...userData}) => 
{
    const {username, email, role, status, gender} = userData as UserDataInterface;
    const [banData, setBanData] = useState({duration: "30 days", description: ""});

    const dateOption = ['30 days', '60 days', '365 days', 'Forever'];

    return(
        <ModalTemplate title={"Ban User"} cancelButtonName={"Exit"}>
            <Box id="modal-description" sx={ModalBodySyntax}>
                <Typography>Username:{username}</Typography>

                <TextField size="small" name={banData.duration} label={"duration"} select>
                    {
                        dateOption.map((option, index) => 
                            (
                                <MenuItem key={index} value={option}>{option}</MenuItem>
                            )
                        )
                    }
                </TextField>
                <TextField size="small" rows={5} name={banData.description} label={"description"} multiline/>
            </Box>
            <Button sx={DeleteButton}>Ban</Button>
        </ModalTemplate>
    )
}

export default BanUserModal