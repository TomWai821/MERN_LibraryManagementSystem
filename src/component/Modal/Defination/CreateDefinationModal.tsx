import { ChangeEvent, FC, useState } from 'react'
import { Box,  TextField } from '@mui/material'

import { useModal } from '../../../Context/ModalContext';
import ModalTemplate from '../../Templates/ModalTemplate';
import { ModalBodySyntax } from '../../../Maps/FormatSyntaxMaps';
import ModalConfirmButton from '../../UIFragment/ModalConfirmButton';
import CreateDefinationConfirmModal from '../Confirmation/Defination/CreateDefinationConfirmModal';
import { CreateModalInterface } from '../../../Model/ModelForModal';

const CreateDefinationModal:FC<CreateModalInterface> = (createModalData) => 
{
    const {value, data} = createModalData;
    const {handleOpen} = useModal();
    const type = value === 0 ? "Genre": "Language";

    const [defination, setDefination] = useState({ genre: data?.genre ?? "", language: data?.language ?? "", shortName: data?.shortName ?? ""});

    const onChange = (event: ChangeEvent<HTMLInputElement>) => 
    {
        const {name, value} = event.target;
        setDefination({...defination, [name]: value})
    }

    const OpenConfirmModal = () => 
    {
       handleOpen(<CreateDefinationConfirmModal value={value} data={defination}/>);
    }
    
    return(
        <ModalTemplate title={`Create ${type} Record`} cancelButtonName={"Exit"}>
            <Box id="modal-description" sx={ModalBodySyntax}>
            {
                value === 0 ?
                <TextField label="Genre" name="genre" value={defination.genre} type="text" size="small" onChange={onChange}/>
                :
                <TextField label="Language" name="language" value={defination.language} type="text" size="small" onChange={onChange}/>
            }
                <TextField label="Short Name" name="shortName" value={defination.shortName} type="text" size="small" onChange={onChange}/>
            </Box>
            
            <ModalConfirmButton clickEvent={OpenConfirmModal} name={"Create"} buttonType={""}/>
        </ModalTemplate>
    );
}

export default CreateDefinationModal;