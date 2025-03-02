import { Box, Button, MenuItem, TextField, Typography } from "@mui/material"
import ModalTemplate from "../../Templates/ModalTemplate"
import { DeleteButton, ModalBodySyntax } from "../../../Maps/FormatSyntaxMaps"
import { ChangeEvent, FC, useState } from "react";
import { BanModalInterface } from "../../../Model/TablePageModel";
import { useModal } from "../../../Context/ModalContext";
import BanUserConfirmModal from "../Confirmation/User/BanUserConfirmModal";
import { dateOption } from "../../../Maps/TextFieldsMaps";

const BanUserModal:FC<BanModalInterface> = ({...userData}) => 
{
    const { _id, username, durationOption, description} = userData as BanModalInterface;
    const [banData, setBanData] = useState({durationOption: durationOption, description: description});
    const {handleOpen} = useModal();

    const onChange = (event:ChangeEvent<HTMLInputElement>) => 
    {
        const {name, value} = event.target;
        setBanData({...banData, [name] : value});
    }

    const onClick = () => 
    {
        handleOpen(<BanUserConfirmModal _id={_id} username={username} durationOption={banData.durationOption} description={banData.description}/>)
    }

    return(
        <ModalTemplate title={"Ban User"} cancelButtonName={"Exit"}>
            <Box id="modal-description" sx={ModalBodySyntax}>
                <Typography>Username: {username}</Typography>

                <TextField size="small" name="durationOption" label={"duration"} onChange={onChange} value={banData.durationOption} select>
                    {
                        dateOption.map((option, index) => 
                            (
                                <MenuItem key={index} value={index}>{option.label}</MenuItem>
                            )
                        )
                    }
                </TextField>
                <TextField size="small" rows={5} name="description" onChange={onChange} label={"description"} value={banData.description} multiline/>
            </Box>
            <Button sx={DeleteButton} onClick={onClick}>Ban</Button>
        </ModalTemplate>
    )
}

export default BanUserModal