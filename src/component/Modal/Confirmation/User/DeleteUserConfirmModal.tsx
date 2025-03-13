import { FC } from 'react'
import { Box, Typography } from '@mui/material'

// Models
import { DeleteModalInterface } from '../../../../Model/ModelForModal';
import { UserResultDataInterface } from '../../../../Model/ResultModel';

// UI Fragment
import DeleteTypography from '../../../UIFragment/DeleteTypography';

// Context
import { useModal } from '../../../../Context/ModalContext';
import { useUserContext } from '../../../../Context/User/UserContext';

// Templates
import ModalTemplate from '../../../Templates/ModalTemplate';

// Data (CSS syntax)
import { ModalBodySyntax, ModalSubTitleSyntax } from '../../../../Maps/FormatSyntaxMaps';
import ModalConfirmButton from '../../../UIFragment/ModalConfirmButton';


const DeleteUserConfirmModal:FC<DeleteModalInterface> = ({...userData}) => 
{
    const {value, _id, data} = userData;
    const Data = data as UserResultDataInterface;

    const { changeUserStatus, actualDeleteUser } = useUserContext();
    const {handleClose} = useModal();

    const DeleteUserAction = (): void => 
    {
        switch(value)
        {
            case 0:
                if(Data.status !== "Delete")
                {
                    changeUserStatus("Delete", _id, "Delete", undefined, 30, "Admin-Request Deletion");   
                }
                break;

            case 2:
                actualDeleteUser(_id, Data.deleteDetails?._id as string, "Deleted");
                break;
        }
        handleClose();
    }

    const setTitle = () =>
    {
        let setTitle = {title: "", subTitle: ""};
        switch(value)
        {
            case 0:
                setTitle.title = "Move to Delete List";
                setTitle.subTitle = "Do you want to move this account to delete list?"
                break;
            
            case 2:
                setTitle.title = "Delete User Record";
                setTitle.subTitle = "Do you want to delete this account?"
                break;
        }

        return setTitle;
    }
    
    return(
        <ModalTemplate title={setTitle().title as string} cancelButtonName={"No"}>
            <Box id="modal-description" sx={ModalBodySyntax}>
                <Typography sx={ModalSubTitleSyntax}>{setTitle().subTitle}</Typography>
                <Typography>Username: {Data.username}</Typography>
                <Typography>Email: {Data.email}</Typography>
                <Typography>Role: {Data.role}</Typography>
                <Typography>Gender: {Data.gender}</Typography>
            </Box>
            
            <DeleteTypography/>
            <ModalConfirmButton clickEvent={DeleteUserAction} name={"Yes"} buttonType={"Important"}/>
        </ModalTemplate>
    );
}

export default DeleteUserConfirmModal;