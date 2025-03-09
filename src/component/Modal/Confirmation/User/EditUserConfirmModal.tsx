import { Box, Button, Typography } from "@mui/material";
import { EditModalInterface, UserDataInterface } from "../../../../Model/TablePageModel";
import { FC, useEffect, useState } from "react";
import { useModal } from "../../../../Context/ModalContext";
import ModalTemplate from "../../../Templates/ModalTemplate";
import { ModalBodySyntax, ModalRemarkSyntax, ModalSubTitleSyntax } from "../../../../Maps/FormatSyntaxMaps";
import EditUserModal from "../../User/EditUserModal";
import { useAllUserContext } from "../../../../Context/User/AllUserContext";
import { UserResultDataInterface } from "../../../../Model/ResultModel";

const EditUserConfirmModal:FC<EditModalInterface> = (editModalData) => 
{
    const {value, editData, compareData} = editModalData;
    const [differences, setDifferences] = useState<string[]>([]);

    const {handleOpen, handleClose} = useModal();
    const {editUserData} = useAllUserContext();

    // editData = use modify, compareData = vanilla one(Before change)
    const generateChangeTypography = (editData: UserDataInterface, compareData: UserDataInterface) => 
    {
        const newDifferences: string[] = [];

        for (const key in editData) 
        {
            if (editData[key as keyof UserDataInterface] !== compareData[key as keyof UserDataInterface]) 
            {
                const capitalizedKey = key.charAt(0).toUpperCase() + key.slice(1);
                newDifferences.push(`${capitalizedKey}: ${compareData[key as keyof UserDataInterface]} -> ${editData[key as keyof UserDataInterface]}`);
            }
        }
        setDifferences(newDifferences);
    }

    const returnEditUserModal = () =>
    {
        setDifferences([]);
        handleOpen(<EditUserModal editData={editData} compareData={compareData} value={value} />);
    }

    const onClick = () => 
    {
        if(differences.length > 0)
        {
            const CompareData = compareData as UserResultDataInterface;
            const EditData = editData as UserDataInterface;
            editUserData(CompareData._id, EditData.username, EditData.email, EditData.gender, EditData.role);
        }
        handleClose();
    }

    useEffect(() => 
    {
        generateChangeTypography(editData as UserDataInterface, compareData as UserDataInterface);
    },
    [editData, compareData]);

    return(
        <ModalTemplate title={"Edit Book Record Confirmation"} cancelButtonName={"No"} cancelButtonEvent={returnEditUserModal}>
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
            <Button variant='contained' onClick={onClick}>Yes</Button>
        </ModalTemplate>
    );
}

export default EditUserConfirmModal;
