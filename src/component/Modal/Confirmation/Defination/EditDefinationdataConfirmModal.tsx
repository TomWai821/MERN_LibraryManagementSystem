import { FC, useEffect, useState } from "react";
import { EditModalInterface } from "../../../../Model/ModelForModal";
import ModalTemplate from "../../../Templates/ModalTemplate";
import { useModal } from "../../../../Context/ModalContext";
import { Box, Typography } from "@mui/material";
import { ModalBodySyntax, ModalRemarkSyntax, ModalSubTitleSyntax } from "../../../../Maps/FormatSyntaxMaps";
import ModalConfirmButton from "../../../UIFragment/ModalConfirmButton";
import { useDefinationContext } from "../../../../Context/Book/DefinationContext";
import { DefinationInterface } from "../../../../Model/ResultModel";
import EditGenreDataModal from "../../Defination/EditGenreDataModal";
import EditLanguageDataModal from "../../Defination/EditLanguageDataModal";

const EditDefinationConfirmModal:FC<EditModalInterface>  = (data) =>
{
    const { value, compareData, editData } = data;
    const { handleOpen, handleClose } = useModal();
    const { editDefination } = useDefinationContext();

    const [differences, setDifferences] = useState<string[]>([]);
    const type = value === 0 ? "Genre" : "Language";

    const returnEditDefinationModal = () => 
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

    const editDefinationAction = () => 
    {
        const EditData = editData as DefinationInterface;
        switch(type)
        {
            case "Genre":
                editDefination(type, EditData._id, EditData.shortName, EditData.genre as string);
                break;

            case "Language":
                editDefination(type, EditData._id, EditData.shortName, EditData.language as string);
                break;
        }
        
        handleClose();
    }

    const compareDifference = (editData: DefinationInterface, compareData: DefinationInterface) => 
    {
        const newDifferences = [];
        for(const key in editData)
        {
            if(editData[key as keyof DefinationInterface] != compareData[key as keyof DefinationInterface])
            {
                const capitalizedKey = key.charAt(0).toUpperCase() + key.slice(1);
                newDifferences.push(`${capitalizedKey}: ${compareData[key as keyof DefinationInterface]} -> ${editData[key as keyof DefinationInterface]}`);
            }
        }
        setDifferences(newDifferences);
    }

    useEffect(() => 
    {
        compareDifference(editData as DefinationInterface, compareData as DefinationInterface);
    },[editData, compareData]);
    
    return(
        <ModalTemplate title={`Edit ${type} Confirmation`} cancelButtonName={"No"} cancelButtonEvent={returnEditDefinationModal}>
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
            
            <ModalConfirmButton clickEvent={editDefinationAction} name={"Yes"} buttonType={""}/>
        </ModalTemplate>
    );
}

export default EditDefinationConfirmModal