import { FC, useEffect, useState } from "react"
import { Box, Button, Typography } from "@mui/material";

// Template
import ModalTemplate from "../../../Templates/ModalTemplate";

// Context
import { useModal } from "../../../../Context/ModalContext";

// Model
import { EditModalInterface } from "../../../../Model/ModelForModal";

// Another Modal
import EditBookModal from "../../Book/EditBookModal";

// Data (CSS Syntax)
import { BookResultDataInterface } from "../../../../Model/ResultModel";
import { useBookContext } from "../../../../Context/Book/BookContext";
import { ModalBodySyntax, ModalRemarkSyntax, ModalSubTitleSyntax } from "../../../../ArraysAndObjects/FormatSyntaxObjects";

const EditBookConfirmModal:FC<EditModalInterface> = (editModalData) => 
{  
    const {value, editData, compareData} = editModalData;
    const [differences, setDifferences] = useState<JSX.Element[]>([]);
    const {handleOpen, handleClose} = useModal();
    const {editBook} = useBookContext();

    useEffect(() => 
    {
        generateChangeTypography(editData as BookResultDataInterface, compareData as BookResultDataInterface);
    },[editData, compareData]);

    const generateChangeTypography = (editData: BookResultDataInterface, compareData: BookResultDataInterface) => 
    {
        let differences: JSX.Element[] = [];
        for (const key in editData) 
        {
            if (editData[key as keyof BookResultDataInterface] !== compareData[key as keyof BookResultDataInterface]) 
            {
                differences.push(
                    <Typography key={key}>
                        {`- ${key}: ${compareData[key as keyof BookResultDataInterface]} -> ${editData[key as keyof BookResultDataInterface]}`}
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
    
    const editBookData = () => 
    {
        const EditData = editData as BookResultDataInterface;
        editBook(EditData._id, EditData.bookname, EditData.genreID, EditData.languageID, EditData.pages, EditData.description);
        handleClose();
    }

    return(
        <ModalTemplate title={"Edit Book Record Confirmation"} cancelButtonName={"No"} cancelButtonEvent={returnEditBookModal}>
            <Box id="modal-description" sx={ModalBodySyntax}>
                <Typography sx={ModalSubTitleSyntax}>Do you want to edit this book record?</Typography>
                <Typography sx={ModalRemarkSyntax}>Changes:</Typography>
                {differences}
                <Typography sx={ModalRemarkSyntax}>Please ensure these information are correct</Typography>
            </Box>
            <Button variant='contained' onClick={editBookData}>Yes</Button>
        </ModalTemplate>

    );
}
export default EditBookConfirmModal