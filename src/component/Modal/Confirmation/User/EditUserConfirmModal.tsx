import { Box, Button, Typography } from "@mui/material";
import { EditModalInterface, UserDataInterface } from "../../../../Model/TablePageModel";
import { FC, useEffect, useState } from "react";
import { useModal } from "../../../../Context/ModalContext";
import ModalTemplate from "../../../Templates/ModalTemplate";
import { ModalBodySyntax, ModalRemarkSyntax, ModalSubTitleSyntax } from "../../../../Maps/FormatSyntaxMaps";
import EditUserModal from "../../User/EditUserModal";

const EditUserConfirmModal:FC<EditModalInterface> = ({editData, compareData}) => 
{
    const [differences, setDifferences] = useState<JSX.Element[]>([]);
    const {handleOpen} = useModal();

    useEffect(() => 
    {
        generateChangeTypography(editData as UserDataInterface, compareData as UserDataInterface);
    },
    [editData, compareData]);

    const generateChangeTypography = (editData: UserDataInterface, compareData: UserDataInterface) => 
    {
        const differences = [];
        for (const key in editData) 
        {
            if (editData[key as keyof UserDataInterface] !== compareData[key as keyof UserDataInterface]) 
            {
                differences.push(
                    <Typography key={key}>
                            {`- ${key}: ${compareData[key as keyof UserDataInterface]} -> ${editData[key as keyof UserDataInterface]}`}
                    </Typography>
                );
            }
        }
    
        if(differences.length == 0)
        {
            differences.push(<Typography>- Nothing Change</Typography>);
        }
    
        setDifferences(differences);
     }

    const returnEditUserModal = () =>
    {
        setDifferences([]);
        handleOpen(<EditUserModal editData={editData} compareData={compareData}/>);
    }

    const onClick = () => 
    {

    }

    return(
        <ModalTemplate title={"Edit Book Record Confirmation"} cancelButtonName={"No"} cancelButtonEvent={returnEditUserModal}>
            <Box id="modal-description" sx={ModalBodySyntax}>
                <Typography sx={ModalSubTitleSyntax}>Do you want to edit this book record?</Typography>
                <Typography sx={ModalRemarkSyntax}>Changes:</Typography>
                {differences}
                <Typography sx={ModalRemarkSyntax}>Please ensure these information are correct</Typography>
            </Box>
            <Button variant='contained' onClick={onClick}>Yes</Button>
        </ModalTemplate>
    );
        
}

export default EditUserConfirmModal