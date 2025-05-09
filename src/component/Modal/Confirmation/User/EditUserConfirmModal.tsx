import { Box, Typography } from "@mui/material";
import { FC, useEffect, useState } from "react";

// Context
import { useModal } from "../../../../Context/ModalContext";
import { useUserContext } from "../../../../Context/User/UserContext";

// Models
import { DetailsInterfaceForSuspend, UserResultDataInterface } from "../../../../Model/ResultModel";
import { UserDataInterface } from "../../../../Model/UserTableModel";
import { EditModalInterface } from "../../../../Model/ModelForModal";

// Template for modal
import ModalTemplate from "../../../Templates/ModalTemplate";

// Another Modal
import EditUserModal from "../../User/EditUserModal";
import EditSuspendUserModal from "../../User/EditSuspendUserModal";

// Useful function
import { TransferDateToISOString } from "../../../../Controller/OtherController";

// UI fragment
import ModalConfirmButton from "../../../UIFragment/ModalConfirmButton";

// Data (CSS syntax)
import { ModalBodySyntax, ModalRemarkSyntax, ModalSubTitleSyntax } from "../../../../ArraysAndObjects/FormatSyntaxObjects";
import ExpandableTypography from "../../../UIFragment/ExpandableTypography";

const EditUserConfirmModal:FC<EditModalInterface> = (editModalData) => 
{
    const {value, editData, compareData} = editModalData;
    const [differences, setDifferences] = useState<JSX.Element[]>([]);

    const {handleOpen, handleClose} = useModal();
    const {editUserData, editSuspendUserData} = useUserContext();

    const compareDifference = (
        editData: UserDataInterface | DetailsInterfaceForSuspend,
        compareData: UserDataInterface | DetailsInterfaceForSuspend
    ) => {
        let differences: JSX.Element[] = [];
        const ignoreList = ["startDate", "dueDate", "description"]; // `description` ignored in loop
    
        for (const key in editData) 
        {
            if (Object.prototype.hasOwnProperty.call(compareData, key) && Object.prototype.hasOwnProperty.call(editData, key) && !ignoreList.includes(key)) 
            {
                const editValue = (editData as any)[key];
                const compareValue = (compareData as any)[key];
    
                let formattedCompareValue = compareValue;
                let formattedEditValue = editValue;
    
                if (["startDate", "dueDate"].includes(key)) 
                {
                    formattedCompareValue = TransferDateToISOString(compareValue).split("T")[0];
                    formattedEditValue = TransferDateToISOString(editValue).split("T")[0];
                }
    
                if (formattedCompareValue !== formattedEditValue) 
                {
                    const capitalizedKey = key.charAt(0).toUpperCase() + key.slice(1);
                    differences.push(<Typography key={key}>{`- ${capitalizedKey}: ${formattedCompareValue} -> ${formattedEditValue}`}</Typography>);
                }
            }
        }
    
        if ((compareData as DetailsInterfaceForSuspend).description?.trim() !== (editData as DetailsInterfaceForSuspend).description?.trim()) 
        {
            differences.push(
                <ExpandableTypography title={"Description"} key={"description"}>
                    {`${(compareData as DetailsInterfaceForSuspend).description} -> ${(editData as DetailsInterfaceForSuspend).description}`}
                </ExpandableTypography>
            );
        }
    
        if (differences.length === 0) 
        {
            differences.push(<Typography key={"nothingChange"}>- No Change detected</Typography>);
        }
    
        setDifferences(differences);
    };

    const returnEditUserModal = () =>
    {
        setDifferences([]);
        switch(value)
        {
            case 0:
                handleOpen(<EditUserModal editData={editData} compareData={compareData} value={value} />);
                break;
            
            case 1:
                handleOpen(<EditSuspendUserModal editData={editData} compareData={compareData} value={value}/>);
                break;
        }
        
    }

    const EditUserAction = () => 
    {
        if(differences.length > 0)
        {
            switch(value)
            {
                case 0:
                    const CompareData = compareData as UserResultDataInterface;
                    const EditData = editData as UserDataInterface;
                    editUserData(CompareData._id, EditData.username, EditData.email, EditData.gender, EditData.role);
                    break;

                case 1:
                    const CompareSuspendUserData = compareData as DetailsInterfaceForSuspend;
                    const EditSuspendUserData = editData as DetailsInterfaceForSuspend;
                    editSuspendUserData(EditSuspendUserData.userID as string, CompareSuspendUserData._id, EditSuspendUserData.dueDate as Date, EditSuspendUserData.description);
                    break;
            }
        }
        handleClose();
    }

    useEffect(() => 
    {
        compareDifference(editData as UserDataInterface | DetailsInterfaceForSuspend, compareData as UserDataInterface | DetailsInterfaceForSuspend);
    },
    [editData, compareData]);

    return(
        <ModalTemplate title={"Edit User Record Confirmation"} width="400px" cancelButtonName={"No"} cancelButtonEvent={returnEditUserModal}>
            <Box id="modal-description" sx={ModalBodySyntax}>
                <Typography sx={ModalSubTitleSyntax}>Do you want to edit this User record?</Typography>
                <Typography sx={ModalRemarkSyntax}>Changes:</Typography>
                {differences}
                <Typography sx={ModalRemarkSyntax}>Please ensure these information are correct</Typography>
            </Box>
            
            <ModalConfirmButton clickEvent={EditUserAction} name={"Yes"} buttonType={""}/>
        </ModalTemplate>
    );
}

export default EditUserConfirmModal;
