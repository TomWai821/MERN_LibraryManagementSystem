import { ChangeEvent, FC, useState } from "react";
import { Box, MenuItem, TextField, Typography } from "@mui/material"

// Template
import ModalTemplate from "../../Templates/ModalTemplate"

// UI Fragment
import ModalConfirmButton from "../../UIFragment/ModalConfirmButton";

// Another Modal
import BanUserConfirmModal from "../Confirmation/User/BanUserConfirmModal";

// Modals
import { useModal } from "../../../Context/ModalContext";

// Model
import { BanModalInterface } from "../../../Model/ModelForModal";

// Data (CSS Syntax and dropdown option)
import { ModalBodySyntax } from "../../../Maps/FormatSyntaxMaps"
import { dateOption } from "../../../Maps/TextFieldsMaps";

const BanUserModal:FC<BanModalInterface> = ({...userData}) => 
{
    const { _id, username, durationOption, description} = userData as BanModalInterface;
    const [banData, setBanData] = useState({durationOption: durationOption ?? 0, description: description});
    const {handleOpen} = useModal();

    const onChange = (event:ChangeEvent<HTMLInputElement>) => 
    {
        const {name, value} = event.target;
        setBanData({...banData, [name] : value});
    }

    const OpenBanUserConfirmModal = () => 
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
            
            <ModalConfirmButton clickEvent={OpenBanUserConfirmModal} name={"Ban"} buttonType={"Important"}/>
        </ModalTemplate>
    )
}

export default BanUserModal