import { Box, Button, Typography } from "@mui/material";
import { useModal } from '../../../../Context/ModalContext';
import { ModalBodySyntax, ModalRemarkSyntax, ModalSubTitleSyntax } from '../../../../Maps/FormatSyntaxMaps';
import ModalTemplate from '../../../Templates/ModalTemplate';
import CreateUserModal from "../../User/CreateUserModal";
import { useUserContext } from "../../../../Context/userContext";

const CreateUserConfirmModal = ({...userData}) => 
{
    const {username, email, password, role, gender, birthDay} = userData;
    const birthDayToString = birthDay.toString();
 
    const { handleOpen, handleClose } = useModal();
    const {createUser} = useUserContext();

    const returnCreateUserModal = () => 
    {
        handleOpen(<CreateUserModal {...userData}/>);
    }

    const registerUser = () => 
    {
        handleClose();
        createUser(username, email, password, role, gender, birthDay);
    }

    return(
        <ModalTemplate title={"Delete Account Confirmation"} cancelButtonName={"No"} cancelButtonEvent={returnCreateUserModal}>
            <Box id="modal-description" sx={ModalBodySyntax}>
            <Typography sx={ModalSubTitleSyntax}>Do you want to create this account?</Typography>
                <Typography>Username: {username}</Typography>
                <Typography>Email: {email}</Typography>
                <Typography>Password: {password}</Typography>
                <Typography>Role: {role}</Typography>
                <Typography>Gender: {gender}</Typography>
                <Typography>BirthDay: {birthDayToString}</Typography>
                <Typography sx={ModalRemarkSyntax}>Please ensure these information are correct</Typography>
            </Box>
            <Button variant="contained" onClick={registerUser}>Yes</Button>
        </ModalTemplate>
    );
}

export default CreateUserConfirmModal;
