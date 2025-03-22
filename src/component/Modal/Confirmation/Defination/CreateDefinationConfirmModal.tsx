import { FC } from "react";
import { Box, Typography } from "@mui/material";

// Context
import { useModal } from '../../../../Context/ModalContext';
import { useDefinationContext } from "../../../../Context/Book/DefinationContext";

// UI Fragment
import ModalConfirmButton from "../../../UIFragment/ModalConfirmButton";

// Template
import ModalTemplate from '../../../Templates/ModalTemplate';

// Another Modal
import CreateDefinationModal from "../../Defination/CreateDefinationModal";

// Data (CSS Synxax)
import { ModalBodySyntax, ModalSubTitleSyntax, ModalRemarkSyntax } from "../../../../ArraysAndObjects/FormatSyntaxObjects";

// Models
import { CreateModalInterface } from "../../../../Model/ModelForModal";
import { DefinationInterface } from "../../../../Model/ResultModel";


const CreateDefinationConfirmModal:FC<CreateModalInterface> = (definationData) => 
{
    const {value, data} = definationData;
    const Data = data as DefinationInterface;
    const type = value === 0 ? "Genre" : "Language";
 
    const { handleOpen, handleClose } = useModal();
    const { createDefination } = useDefinationContext();

    const returnCreateUserModal = () => 
    {
        handleOpen(<CreateDefinationModal {...definationData}/>);
    }

    const createDefinationData = () => 
    {
        switch(value)
        {
            case 0:
                createDefination(type, Data.shortName, Data.genre as string);
                break;

            case 1:
                createDefination(type, Data.shortName, Data.language as string);
                break;
        }
        handleClose();
    }

    return(
        <ModalTemplate title={`Create ${type} Confirmation`} cancelButtonName={"No"} cancelButtonEvent={returnCreateUserModal}>
            <Box id="modal-description" sx={ModalBodySyntax}>
            <Typography sx={ModalSubTitleSyntax}>Do you want to create this {type}?</Typography>
                {
                    value === 0 ?<Typography>Genre: {Data.genre}</Typography>:<Typography>Language: {Data.language}</Typography>
                }
                <Typography>ShortName: {Data.shortName}</Typography>
                <Typography sx={ModalRemarkSyntax}>Please ensure these information are correct</Typography>
            </Box>
            
            <ModalConfirmButton clickEvent={createDefinationData} name={"Yes"} buttonType={""}/>
        </ModalTemplate>
    );
}

export default CreateDefinationConfirmModal;
