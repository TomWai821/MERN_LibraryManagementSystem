import { FC } from 'react'
import { Box, Button, Typography } from '@mui/material'

// Models
import { DeleteModalInterface } from '../../../../Model/TablePagesAndModalModel';

// Context
import { useModal } from '../../../../Context/ModalContext';
import { useDeleteUserContext } from '../../../../Context/User/DeleteUserContext';
import { useAllUserContext } from '../../../../Context/User/AllUserContext';

// Templates
import ModalTemplate from '../../../Templates/ModalTemplate';
import DeleteTypography from '../../../UIFragment/Typography/DeleteTypography';

// Data (CSS syntax)
import { DeleteButton, ModalBodySyntax, ModalSubTitleSyntax } from '../../../../Maps/FormatSyntaxMaps';

const DeleteUserConfirmModal:FC<DeleteModalInterface> = ({...userData}) => 
{
    const {value, _id, username, email, role, gender, status, bannedDetails} = userData;
    const {changeUserStatus, fetchAllUser} = useAllUserContext();
    const {actualDeleteUser, fetchAllDeleteUser} = useDeleteUserContext();
    const {handleClose} = useModal();

    const DeleteUserAction = (): void => 
    {
        switch(value)
        {
            case 0:
                if(status !== "Delete")
                {
                    changeUserStatus(_id, "Delete", 30, "Admin-Request Deletion");   
                }
                handleClose();
                break;

            case 2:
                actualDeleteUser(_id, bannedDetails?._id as string, "Deleted");
                handleClose();
                break;
        }
        fetchAllUser();
        fetchAllDeleteUser();
    }

    const setTitle = () =>
    {
        switch(value)
        {
            case 0:
                return "Move to Delete List";
            
            case 2:
                return "Delete User Record";
        }
    }

    const setSubTitle = () => 
    {
        switch(value)
        {
            case 0:
                return "Do you want to move this account to delete list?";
            
            case 2:
                return "Do you want to delete this account?";
        }
    }
    
    return(
        <ModalTemplate title={setTitle() as string} cancelButtonName={"No"}>
            <Box id="modal-description" sx={ModalBodySyntax}>
                <Typography sx={ModalSubTitleSyntax}>{setSubTitle()}</Typography>
                <Typography>Username: {username}</Typography>
                <Typography>Email: {email}</Typography>
                <Typography>Role: {role}</Typography>
                <Typography>Gender: {gender}</Typography>
            </Box>
            
            <DeleteTypography/>
            <Button variant='contained' sx={DeleteButton} onClick={DeleteUserAction}>Yes</Button>
        </ModalTemplate>
    );
}

export default DeleteUserConfirmModal;