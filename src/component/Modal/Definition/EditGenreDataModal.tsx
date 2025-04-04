import { ChangeEvent, FC, useState } from 'react'
import { MenuItem, TextField, Box } from '@mui/material';

// UI Fragment
import ModalConfirmButton from '../../UIFragment/ModalConfirmButton';

// Template
import ModalTemplate from '../../Templates/ModalTemplate';

// Another Modal
import EditDefinitionConfirmModal from '../Confirmation/Definition/EditDefinitionConfirmModal';

// Context
import { useModal } from '../../../Context/ModalContext';

// Models
import { DefinitionInterface } from '../../../Model/ResultModel';
import { EditModalInterface } from '../../../Model/ModelForModal';

// Data (Dropdown option and CSS Syntax)
import { EditGenreInputField } from '../../../ArraysAndObjects/TextFieldsArrays';
import { ModalBodySyntax } from '../../../ArraysAndObjects/FormatSyntaxObjects';

const EditGenreDataModal:FC<EditModalInterface> = (editModalData) => 
{
    const { editData, compareData } = editModalData;
    const {handleOpen} = useModal();
    
    const { _id, shortName, genre } = editData as DefinitionInterface;
    const [genreData, setGenreData] = useState<DefinitionInterface>({_id:_id, shortName:shortName, genre: genre});

    const onChange = (event: ChangeEvent<HTMLInputElement>) => 
    {
        const {name, value} = event.target;
        setGenreData({...genreData, [name] : value})
    }

    const openConfirmModal = () => 
    {
        handleOpen(<EditDefinitionConfirmModal value={0} editData={genreData} compareData={compareData}/>)
    }
    
    return(
        <ModalTemplate title={"Edit Language Definition Record"} width="400px" cancelButtonName={"Exit"}>
            <Box id="modal-description" sx={ModalBodySyntax}>
                {
                    EditGenreInputField.map((inputField, index) => 
                    (
                        <TextField key={index} label={inputField.label} name={inputField.name} onChange={onChange} value={genreData[inputField.name as keyof DefinitionInterface]} size="small"/>
                    ))
                }
            </Box>

            <ModalConfirmButton clickEvent={openConfirmModal} name={"Edit"} buttonType={""}/>
        </ModalTemplate>
    );
}

export default EditGenreDataModal;