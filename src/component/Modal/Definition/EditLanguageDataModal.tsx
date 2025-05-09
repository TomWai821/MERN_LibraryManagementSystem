import { ChangeEvent, FC, useState } from 'react'
import { TextField, Box } from '@mui/material';

// UI Fragment
import ModalConfirmButton from '../../UIFragment/ModalConfirmButton';

// Template
import ModalTemplate from '../../Templates/ModalTemplate';

// Context
import { useModal } from '../../../Context/ModalContext';

// Models
import { DefinitionInterface } from '../../../Model/ResultModel';
import { EditModalInterface } from '../../../Model/ModelForModal';

// Data (Dropdown option and CSS Syntax)
import { ModalBodySyntax } from '../../../ArraysAndObjects/FormatSyntaxObjects';
import EditDefinitionConfirmModal from '../Confirmation/Definition/EditDefinitionConfirmModal';
import { EditLanguageInputField } from '../../../ArraysAndObjects/TextFieldsArrays';

const EditLanguageDataModal:FC<EditModalInterface> = (editModalData) => 
{
    const { editData, compareData } = editModalData;
    const {handleOpen} = useModal();
    
    const { _id, shortName, language } = editData as DefinitionInterface;
    const [languageData, setLanguageData] = useState<DefinitionInterface>({_id:_id, shortName:shortName, language: language});

    const onChange = (event: ChangeEvent<HTMLInputElement>) => 
    {
        const {name, value} = event.target;
        setLanguageData({...languageData, [name] : value})
    }

    const openConfirmModal = () => 
    {
        handleOpen(<EditDefinitionConfirmModal value={1} editData={languageData} compareData={compareData}/>);
    }
    
    return(
        <ModalTemplate title={"Edit Language Definition Record"} width="400px" cancelButtonName={"Exit"}>
            <Box id="modal-description" sx={ModalBodySyntax}>
                {
                    EditLanguageInputField.map((inputField, index) => 
                    (
                        <TextField key={index} label={inputField.label} name={inputField.name} onChange={onChange} value={languageData[inputField.name as keyof DefinitionInterface]} size="small"/>
                    ))
                }
            </Box>

            <ModalConfirmButton clickEvent={openConfirmModal} name={"Edit"} buttonType={""}/>
        </ModalTemplate>
    );
}

export default EditLanguageDataModal;