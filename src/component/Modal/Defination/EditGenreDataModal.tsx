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
import { EditGenreInputField } from '../../../Maps/TextFieldsMaps';
import EditDefinationConfirmModal from '../Confirmation/Defination/EditDefinationdataConfirmModal';

const EditGenreDataModal:FC<EditModalInterface> = (editModalData) => 
{
    const { editData, compareData } = editModalData;
    const {handleOpen} = useModal();
    
    const { _id, shortName, genre } = editData as DefinationInterface;
    const [genreData, setGenreData] = useState<DefinationInterface>({_id:_id, shortName:shortName, genre: genre});

    const onChange = (event: ChangeEvent<HTMLInputElement>) => 
    {
        const {name, value} = event.target;
        setGenreData({...genreData, [name] : value})
    }

    const openConfirmModal = () => 
    {
        handleOpen(<EditDefinationConfirmModal value={0} editData={genreData} compareData={compareData}/>)
    }
    
    return(
        <ModalTemplate title={"Edit Language Defination Record"} cancelButtonName={"Exit"}>
            <Box id="modal-description" sx={ModalBodySyntax}>
                {
                    EditGenreInputField.map((inputField, index) => 
                    (
                        <TextField key={index} label={inputField.label} name={inputField.name} onChange={onChange} value={genreData[inputField.name as keyof DefinationInterface]} size="small"/>
                    ))
                }
            </Box>

            <ModalConfirmButton clickEvent={openConfirmModal} name={"Edit"} buttonType={""}/>
        </ModalTemplate>
    );
}

export default EditGenreDataModal;