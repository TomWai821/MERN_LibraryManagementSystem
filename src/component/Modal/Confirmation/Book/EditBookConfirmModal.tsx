import { FC, useEffect, useState } from "react"
import { Box, Button, Typography } from "@mui/material";

// Template
import ModalTemplate from "../../../Templates/ModalTemplate";


import { EditModalInterface } from "../../../../Model/TablePagesAndModalModel";
import { BookDataInterface } from "../../../../Model/BookTableModel";

// Context
import { useModal } from "../../../../Context/ModalContext";

// Another Modal
import EditBookModal from "../../Book/EditBookModal";
// Data (CSS Syntax)
import { ModalBodySyntax, ModalRemarkSyntax, ModalSubTitleSyntax } from "../../../../Maps/FormatSyntaxMaps";

const EditBookConfirmModal:FC<EditModalInterface> = (editModalData) => 
{  
    const {value, editData, compareData} = editModalData;
    const [differences, setDifferences] = useState<JSX.Element[]>([]);
    const {handleOpen} = useModal();

    useEffect(() => 
    {
            generateChangeTypography(editData as BookDataInterface, compareData as BookDataInterface);
    },[editData, compareData]);

    const generateChangeTypography = (editData: BookDataInterface, compareData: BookDataInterface) => 
    {
        let differences: JSX.Element[] = [];
        for (const key in editData) 
        {
            if (editData[key as keyof BookDataInterface] !== compareData[key as keyof BookDataInterface]) 
            {
                differences.push(
                    <Typography key={key}>
                        {`- ${key}: ${compareData[key as keyof BookDataInterface]} -> ${editData[key as keyof BookDataInterface]}`}
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
   
    const returnEditBookModal = () => 
    {
        setDifferences([]);
        handleOpen(<EditBookModal editData={editData} compareData={compareData} value={value} />);
    }
    
    const onClick = () => 
    {
    
    }

    return(
        <ModalTemplate title={"Edit Book Record Confirmation"} cancelButtonName={"No"} cancelButtonEvent={returnEditBookModal}>
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
export default EditBookConfirmModal