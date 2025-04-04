import { FC } from "react";
import { Box, Typography } from "@mui/material";

// Context
import { useModal } from '../../../../Context/ModalContext';
import { useDefinitionContext } from "../../../../Context/Book/DefinitionContext";

// UI Fragment
import ModalConfirmButton from "../../../UIFragment/ModalConfirmButton";

// Template
import ModalTemplate from '../../../Templates/ModalTemplate';

// Data (CSS Synxax)
import { ModalBodySyntax, ModalSubTitleSyntax, ModalRemarkSyntax } from "../../../../ArraysAndObjects/FormatSyntaxObjects";

// Models
import { CreateModalInterface } from "../../../../Model/ModelForModal";
import { DefinitionInterface } from "../../../../Model/ResultModel";

// Another Modal
import CreateDefinitionModal from "../../Definition/CreateDefinitionModal";


const CreateDefinitionConfirmModal:FC<CreateModalInterface> = (definationData) => 
{
    const {value, data} = definationData;
    const Data = data as DefinitionInterface;
    const type = value === 0 ? "Genre" : "Language";
 
    const { handleOpen, handleClose } = useModal();
    const { createDefinition } = useDefinitionContext();

    const returnCreateUserModal = () => 
    {
        handleOpen(<CreateDefinitionModal {...definationData}/>);
    }

    const createDefinitionData = () => 
    {
        switch(value)
        {
            case 0:
                createDefinition(type, Data.shortName, Data.genre as string);
                break;

            case 1:
                createDefinition(type, Data.shortName, Data.language as string);
                break;
        }
        handleClose();
    }

    return(
        <ModalTemplate title={`Create ${type} Confirmation`} width="400px" cancelButtonName={"No"} cancelButtonEvent={returnCreateUserModal}>
            <Box id="modal-description" sx={ModalBodySyntax}>
            <Typography sx={ModalSubTitleSyntax}>Do you want to create this {type}?</Typography>
                {
                    value === 0 ? <Typography>Genre: {Data.genre}</Typography>:<Typography>Language: {Data.language}</Typography>
                }
                <Typography>ShortName: {Data.shortName}</Typography>
                <Typography sx={ModalRemarkSyntax}>Please ensure these information are correct</Typography>
            </Box>
            
            <ModalConfirmButton clickEvent={createDefinitionData} name={"Yes"} buttonType={""}/>
        </ModalTemplate>
    );
}

export default CreateDefinitionConfirmModal;
