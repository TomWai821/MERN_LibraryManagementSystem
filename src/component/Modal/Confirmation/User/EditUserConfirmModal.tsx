import { Box, Typography } from "@mui/material";
import { FC, useEffect, useState } from "react";

// Context
import { useModal } from "../../../../Context/ModalContext";
import { useAllUserContext } from "../../../../Context/User/AllUserContext";
import { useBannedUserContext } from "../../../../Context/User/BannedUserContext";

// Models
import { DetailsInterfaceForBannedAndDelete, UserResultDataInterface } from "../../../../Model/ResultModel";
import { UserDataInterface } from "../../../../Model/UserTableModel";
import { EditModalInterface } from "../../../../Model/ModelForModal";

// Template for modal
import ModalTemplate from "../../../Templates/ModalTemplate";

// Another Modal
import EditUserModal from "../../User/EditUserModal";

// Data (CSS syntax)
import { ModalBodySyntax, ModalRemarkSyntax, ModalSubTitleSyntax } from "../../../../Maps/FormatSyntaxMaps";
import ModalConfirmButton from "../../../UIFragment/ModalConfirmButton";
import EditBanUserModal from "../../User/EditBanUserModal";
import { TransferDateToISOString } from "../../../../Controller/OtherController";

const EditUserConfirmModal:FC<EditModalInterface> = (editModalData) => 
{
    const {value, editData, compareData} = editModalData;
    const [differences, setDifferences] = useState<string[]>([]);

    const {handleOpen, handleClose} = useModal();
    const {editUserData} = useAllUserContext();
    const {editBannedUserData} = useBannedUserContext();

    // editData = use modify, compareData = vanilla one(Before change)
    const generateChangeTypography = (editData: UserDataInterface | DetailsInterfaceForBannedAndDelete, compareData: UserDataInterface | DetailsInterfaceForBannedAndDelete) => 
    {
        const newDifferences: string[] = [];

        for (const key in editData) 
        {
            if (Object.prototype.hasOwnProperty.call(compareData, key) && Object.prototype.hasOwnProperty.call(editData, key)) 
            {
                const editValue = (editData as any)[key];
                const compareValue = (compareData as any)[key];

                let formattedCompareValue = compareValue;

                if (["startDate","dueDate"].includes(key)) 
                {
                    formattedCompareValue = TransferDateToISOString(compareValue);
                }; 

                if (formattedCompareValue !== editValue) 
                {
                    const capitalizedKey = key.charAt(0).toUpperCase() + key.slice(1);
                    newDifferences.push(`${capitalizedKey}: ${formattedCompareValue} -> ${editValue}`);
                }
            }
        }
        setDifferences(newDifferences);
    }

    const returnEditUserModal = () =>
    {
        setDifferences([]);
        switch(value)
        {
            case 0:
                handleOpen(<EditUserModal editData={editData} compareData={compareData} value={value} />);
                break;
            
            case 1:
                handleOpen(<EditBanUserModal editData={editData} compareData={compareData} value={value}/>);
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
                    const CompareBanUserData = compareData as DetailsInterfaceForBannedAndDelete;
                    const EditBanUserData = editData as DetailsInterfaceForBannedAndDelete;
                    editBannedUserData(EditBanUserData.userID as string, CompareBanUserData._id, EditBanUserData.dueDate as Date, EditBanUserData.description);
                    break;
            }
        }
        handleClose();
    }

    useEffect(() => 
    {
        generateChangeTypography(editData as UserDataInterface | DetailsInterfaceForBannedAndDelete, compareData as UserDataInterface | DetailsInterfaceForBannedAndDelete);
    },
    [editData, compareData]);

    return(
        <ModalTemplate title={"Edit User Record Confirmation"} cancelButtonName={"No"} cancelButtonEvent={returnEditUserModal}>
            <Box id="modal-description" sx={ModalBodySyntax}>
                <Typography sx={ModalSubTitleSyntax}>Do you want to edit this book record?</Typography>
                <Typography sx={ModalRemarkSyntax}>Changes:</Typography>
                {
                    differences.length > 0 ? differences.map((difference, index) => 
                        (
                            <Typography key={index}>{difference}</Typography>
                        )
                    )
                    :<Typography>- "Nothing Changed"</Typography>
                }

                <Typography sx={ModalRemarkSyntax}>Please ensure these information are correct</Typography>
            </Box>
            
            <ModalConfirmButton clickEvent={EditUserAction} name={"Yes"} buttonType={""}/>
        </ModalTemplate>
    );
}

export default EditUserConfirmModal;
