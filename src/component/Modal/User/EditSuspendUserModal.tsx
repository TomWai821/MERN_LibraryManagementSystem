import { ChangeEvent, FC, useState } from 'react'
import { MenuItem, TextField, Box } from '@mui/material';

// UI Fragment
import ModalConfirmButton from '../../UIFragment/ModalConfirmButton';

// Template
import ModalTemplate from '../../Templates/ModalTemplate';

// Another Modal
import EditUserConfirmModal from '../Confirmation/User/EditUserConfirmModal';

// Context
import { useModal } from '../../../Context/ModalContext';

// Models
import { DetailsInterfaceForSuspendAndDelete } from '../../../Model/ResultModel';
import { EditModalInterface } from '../../../Model/ModelForModal';

// Data (Dropdown option and CSS Syntax)

import { TransferDateToISOString } from '../../../Controller/OtherController';
import { ModalBodySyntax } from '../../../ArraysAndObjects/FormatSyntaxObjects';
import { EditSuspendUserInputField } from '../../../ArraysAndObjects/TextFieldsArrays';

const EditSuspendUserModal:FC<EditModalInterface> = (editModalData) => 
{
    const { value, editData, compareData } = editModalData;
    const {handleOpen} = useModal();
    
    const { _id, userID, description, startDate, dueDate, status } = editData as DetailsInterfaceForSuspendAndDelete;
    const bannedIDToString = _id.toString() as string;
    const startDateToString = TransferDateToISOString(startDate as Date) as string;
    const dueDateToString = TransferDateToISOString(dueDate as Date) as string;
    const descriptionToString = description.toString() as string;
    const [banData, setSuspendData] = useState<DetailsInterfaceForSuspendAndDelete>({_id: bannedIDToString, userID:userID, startDate: startDateToString, dueDate: dueDateToString, description: descriptionToString, status: status });

    const onChange = (event: ChangeEvent<HTMLInputElement>) => 
    {
        const {name, value} = event.target;
        setSuspendData({...banData, [name] : value})
    }

    const openConfirmModal = () => 
    {
        handleOpen(<EditUserConfirmModal value={value} editData={banData} compareData={compareData} />);
    }
    
    return(
        <ModalTemplate title={"Edit Suspend Record"} width="400px" cancelButtonName={"Exit"}>
            <Box id="modal-description" sx={ModalBodySyntax}>
                {
                    EditSuspendUserInputField.map((field, index) => (
                        <TextField key={index} label={field.label} name={field.name} value={banData[field.name as keyof DetailsInterfaceForSuspendAndDelete]}
                            type={field.type} size="small" onChange={onChange} select={field.select} multiline={field.rows > 1} rows={field.rows} disabled={field.disable}>
                            {
                                field.select && field.options.map((option, index) => 
                                (
                                    <MenuItem key={index} value={option}>{option}</MenuItem>
                                ))  
                            }
                        </TextField>
                    ))   
                }
            </Box>

            <ModalConfirmButton clickEvent={openConfirmModal} name={"Edit"} buttonType={""}/>
        </ModalTemplate>
    );
}

export default EditSuspendUserModal;