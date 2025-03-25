import { Box, Typography } from "@mui/material";
import { FC, useEffect, useState } from "react";

// Models
import { DefinitionInterface } from "../../../../Model/ResultModel";
import { EditModalInterface } from "../../../../Model/ModelForModal";

// UI fragment
import ModalConfirmButton from "../../../UIFragment/ModalConfirmButton";
import ModalTemplate from "../../../Templates/ModalTemplate";

// Context
import { useModal } from "../../../../Context/ModalContext";
import { useDefinitionContext } from "../../../../Context/Book/DefinitionContext";

// Another Modals
import EditGenreDataModal from "../../Definition/EditGenreDataModal";
import EditLanguageDataModal from "../../Definition/EditLanguageDataModal";

// useful Array/Objects(Data)
import { ModalBodySyntax, ModalRemarkSyntax, ModalSubTitleSyntax } from "../../../../ArraysAndObjects/FormatSyntaxObjects";

const EditDefinitionConfirmModal:FC<EditModalInterface>  = (data) =>
{
    const { value, compareData, editData } = data;
    const { handleOpen, handleClose } = useModal();
    const { editDefinition } = useDefinitionContext();

    const [differences, setDifferences] = useState<string[]>([]);
    const type = value === 0 ? "Genre" : "Language";

    const returnEditDefinitionModal = () => 
    {
        switch(value)
        {
            case 0:
                handleOpen(<EditGenreDataModal editData={editData} compareData={compareData}/>);
                break;

            case 1:
                handleOpen(<EditLanguageDataModal editData={editData} compareData={compareData}/>);
                break;
        }
    }

    const editDefinitionAction = () => 
    {
        const EditData = editData as DefinitionInterface;
        switch(type)
        {
            case "Genre":
                editDefinition(type, EditData._id, EditData.shortName, EditData.genre as string);
                break;

            case "Language":
                editDefinition(type, EditData._id, EditData.shortName, EditData.language as string);
                break;
        }
        
        handleClose();
    }

    const compareDifference = (editData: DefinitionInterface, compareData: DefinitionInterface) => 
    {
        const newDifferences = [];
        for(const key in editData)
        {
            if(editData[key as keyof DefinitionInterface] != compareData[key as keyof DefinitionInterface])
            {
                const capitalizedKey = key.charAt(0).toUpperCase() + key.slice(1);
                newDifferences.push(`${capitalizedKey}: ${compareData[key as keyof DefinitionInterface]} -> ${editData[key as keyof DefinitionInterface]}`);
            }
        }
        setDifferences(newDifferences);
    }

    useEffect(() => 
    {
        compareDifference(editData as DefinitionInterface, compareData as DefinitionInterface);
    },[editData, compareData]);
    
    return(
        <ModalTemplate title={`Edit ${type} Confirmation`} width="400px"  cancelButtonName={"No"} cancelButtonEvent={returnEditDefinitionModal}>
            <Box id="modal-description" sx={ModalBodySyntax}>
                <Typography sx={ModalSubTitleSyntax}>{`Do you want to edit this ${type} record?`}</Typography>
                <Typography sx={ModalRemarkSyntax}>Changes:</Typography>
                {
                    differences.length > 0 ? differences.map((difference, index) => 
                        (
                            <Typography key={index}>{difference}</Typography>
                        )):
                   <Typography>- "Nothing Changed"</Typography>
                }

                <Typography sx={ModalRemarkSyntax}>Please ensure these information are correct</Typography>
            </Box>
            
            <ModalConfirmButton clickEvent={editDefinitionAction} name={"Yes"} buttonType={""}/>
        </ModalTemplate>
    );
}

export default EditDefinitionConfirmModal