import { FC, useEffect, useState } from "react"
import ModalTemplate from "../../../Templates/ModalTemplate"
import { EditModalInterface } from "../../../../Model/ModelForModal"
import EditContactModal from "../../Contact/EditContactModal";
import { useModal } from "../../../../Context/ModalContext";
import { useContactContext } from "../../../../Context/Book/ContactContext";
import { Box, Typography } from "@mui/material";
import { ModalBodySyntax, ModalRemarkSyntax, ModalSubTitleSyntax } from "../../../../ArraysAndObjects/FormatSyntaxObjects";
import ModalConfirmButton from "../../../UIFragment/ModalConfirmButton";
import { ContactInterface } from "../../../../Model/ResultModel";

const EditContactConfirmModal:FC<EditModalInterface> = (data) => 
{
    const { value, compareData, editData } = data;
    const { handleOpen, handleClose } = useModal();
    const { editContactData } = useContactContext();

    const [differences, setDifferences] = useState<string[]>([]);
    const type = value === 0 ? "Author" : "Publisher";

    const returnEditDefinitionModal = () => 
    {
        handleOpen(<EditContactModal value={value} editData={editData} compareData={compareData}/>);
    }

    const editDefinitionAction = () => 
    {
        switch(value)
        {
            case 0:
                editContactData(type, compareData._id, editData.author, editData.phoneNumber, editData.email);
                break;

            case 1:
                editContactData(type, compareData._id, editData.publisher, editData.phoneNumber, editData.email, editData.address);
                break;
        }
        handleClose();
    }

    const compareDifference = (editData: ContactInterface, compareData: ContactInterface) => 
    {
        let ignoreList: string | string[] = [];

        switch(value)
        {   
            case 0:
                ignoreList = ["publisher", "address"];
                break;

            case 1:
                ignoreList = ["author"];
                break;
        }

        const newDifferences = [];
        for(const key in editData)
        {
            if(ignoreList.includes(key))
            {
                continue;
            }

            if(editData[key as keyof ContactInterface] != compareData[key as keyof ContactInterface])
            {
                const capitalizedKey = key.charAt(0).toUpperCase() + key.slice(1);
                newDifferences.push(`${capitalizedKey}: ${compareData[key as keyof ContactInterface]} -> ${editData[key as keyof ContactInterface]}`);
            }
        }
        setDifferences(newDifferences);
    }

    useEffect(() => 
    {
        compareDifference(editData as ContactInterface, compareData as ContactInterface);
    },[editData, compareData]);

    return(
        <ModalTemplate title={`Edit ${type} Record`} width="400px" cancelButtonName={"Exit"} cancelButtonEvent={returnEditDefinitionModal}>
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
    )
}

export default EditContactConfirmModal