import { ChangeEvent, FC, useState } from 'react'
import { MenuItem, TextField, Box } from '@mui/material';

// UI Fragment
import ModalConfirmButton from '../../UIFragment/ModalConfirmButton';

// Template
import ModalTemplate from '../../Templates/ModalTemplate';

// Another Modal


// Context
import { useModal } from '../../../Context/ModalContext';

// Models
import { DefinationInterface } from '../../../Model/ResultModel';
import { EditModalInterface } from '../../../Model/ModelForModal';

// Data (Dropdown option and CSS Syntax)
import { ModalBodySyntax } from '../../../Maps/FormatSyntaxMaps';
import { EditLanguageInputField } from '../../../Maps/TextFieldsMaps';
import EditDefinationConfirmModal from '../Confirmation/Defination/EditDefinationdataConfirmModal';

const EditLanguageDataModal:FC<EditModalInterface> = (editModalData) => 
{
    const { editData, compareData } = editModalData;
    const {handleOpen} = useModal();
    
    const { _id, shortName, language } = editData as DefinationInterface;
    const [languageData, setLanguageData] = useState<DefinationInterface>({_id:_id, shortName:shortName, language: language});

    const onChange = (event: ChangeEvent<HTMLInputElement>) => 
    {
        const {name, value} = event.target;
        setLanguageData({...languageData, [name] : value})
    }

    const openConfirmModal = () => 
    {
        handleOpen(<EditDefinationConfirmModal editData={editData} compareData={compareData}/>);
    }
    
    return(
        <ModalTemplate title={"Edit Language Defination Record"} cancelButtonName={"Exit"}>
            <Box id="modal-description" sx={ModalBodySyntax}>
                {
                    EditLanguageInputField.map((inputField, index) => 
                    (
                        <TextField key={index} label={inputField.label} name={inputField.name} onChange={onChange} value={languageData[inputField.name as keyof DefinationInterface]} size="small"/>
                    ))
                }
            </Box>

            <ModalConfirmButton clickEvent={openConfirmModal} name={"Edit"} buttonType={""}/>
        </ModalTemplate>
    );
}

export default EditLanguageDataModal;