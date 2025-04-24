import { FC } from "react";
import { Box, Button } from "@mui/material";

import ModalTemplate from "../../Templates/ModalTemplate";

import { DisplayDataModalInterface } from "../../../Model/ModelForModal";

import { ModalBodySyntax } from '../../../ArraysAndObjects/FormatSyntaxObjects';
import AllBookDataBody from "./DisplayBookDataBody/AllBookDataBody";
import LoanBookDataBody from "./DisplayBookDataBody/LoanBookDataBody";
import { BookDataInterface, LoanBookInterface } from "../../../Model/ResultModel";
import { StatusDetectionForBook } from "../../../Controller/OtherUsefulController";
import { useModal } from "../../../Context/ModalContext";
import LoanBookConfirmationModal from "../Confirmation/Book/LoanBookConfirmationModal";

const DisplayBookDataModal:FC<DisplayDataModalInterface> = (displayUserData) => 
{
    const {position, value, data, isLoggedIn} = displayUserData;
    const {handleOpen} = useModal();
    const width = '600px';

    const setTitle = () => 
    {
        let displayData = {title:"", displayBody:<></>}
        switch(value)
        {
            case 0:
                displayData.title = "Book Information";
                displayData.displayBody = <AllBookDataBody data={data as BookDataInterface} isLoggedIn={isLoggedIn}/>
                break;

            case 1:
                displayData.title = "OnLoan Book Information";
                displayData.displayBody = <LoanBookDataBody data={data as BookDataInterface} isLoggedIn={isLoggedIn}/>
                break;

        }
        return displayData;
    }

    const bookStatusValidation = StatusDetectionForBook((data as BookDataInterface).status as string|| (data as LoanBookInterface).bookDetails?.status as string, "Loaned");

    const openLoanBookModal = () => 
    {
        handleOpen(
        <LoanBookConfirmationModal 
            _id={data._id}
            author={(data as BookDataInterface).author || (data as LoanBookInterface).bookDetails?.author as string} 
            bookname={(data as BookDataInterface).bookname || (data as LoanBookInterface).bookDetails?.bookname as string}
            language={(data as BookDataInterface).languageDetails.language as string || (data as LoanBookInterface).bookDetails?.languageDetails.language as string}
            genre={(data as BookDataInterface).genreDetails.genre as string || (data as LoanBookInterface).bookDetails?.genreDetails.genre as string}
            description={(data as BookDataInterface).description as string || (data as LoanBookInterface).bookDetails?.description as string}
            imageUrl={(data as BookDataInterface).image?.url as string || (data as LoanBookInterface).bookDetails?.image?.url as string} />);
    }

    return(
        <ModalTemplate title={setTitle().title as string} width={width} cancelButtonName={"Exit"} >
            <Box id="modal-description" sx={ModalBodySyntax}>
                {setTitle().displayBody}
            </Box>

            {
                (position === "mainPage" && value === 0 && isLoggedIn) &&
                <Button variant="contained" onClick={openLoanBookModal} disabled={bookStatusValidation}>Loan Book</Button>
            }
        </ModalTemplate>
    );
}

export default DisplayBookDataModal;