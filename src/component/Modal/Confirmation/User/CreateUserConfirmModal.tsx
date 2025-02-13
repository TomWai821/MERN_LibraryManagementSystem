import { Box, Button, Typography } from "@mui/material";
import { useModal } from '../../../../Context/ModalContext';
import { ModalBodySyntax, ModalRemarkSyntax, ModalSubTitleSyntax } from '../../../../Maps/FormatSyntaxMaps';
import ModalTemplate from '../../../Templates/ModalTemplate';
import { CreateUserInterface } from "../../../../Model/TablePageModel";
import { FC } from "react";

const CreateUserConfirmModal:FC<CreateUserInterface> = ({...userData}) => 
{
    const {username, email, password, role, gender} = userData;

    const {handleOpen} = useModal();

    return(
        <ModalTemplate title={"Delete Account Confirmation"} cancelButtonName={"No"}>
            <Box id="modal-description" sx={ModalBodySyntax}>
            <Typography sx={ModalSubTitleSyntax}>Do you want to create this account?</Typography>
                <Typography>Username: {username}</Typography>
                <Typography>Email: {email}</Typography>
                <Typography>Password: {password}</Typography>
                <Typography>Role: {role}</Typography>
                <Typography>Gender: {gender}</Typography>
                <Typography sx={ModalRemarkSyntax}>Please ensure these information are correct</Typography>
            </Box>
            <Button variant="contained">Yes</Button>
        </ModalTemplate>
    );
}

export default CreateUserConfirmModal;