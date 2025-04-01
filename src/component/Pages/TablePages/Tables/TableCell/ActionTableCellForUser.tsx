import { IconButton, TableCell, Tooltip } from "@mui/material";

import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import { StatusDetectionForBook } from "../../../../../Controller/OtherUsefulController";
import { UserActionTableCellInterface } from "../../../../../Model/TablePagesAndModalModel";
import { FC } from "react";
import { BookDataInterface, LoanBookInterface } from "../../../../../Model/ResultModel";
import { useModal } from "../../../../../Context/ModalContext";
import LoanBookConfirmationModal from "../../../../Modal/Confirmation/Book/LoanBookConfirmationModal";

const ActionTableCellForUser:FC<UserActionTableCellInterface> = (actionTableCellData) => 
{
    const {Information} = actionTableCellData;
    const {handleOpen} = useModal();

    const openLoanBookModal = () => 
    {
        const bookData = Information as BookDataInterface;
        handleOpen(<LoanBookConfirmationModal _id={bookData._id} bookname={bookData.bookname} language={bookData.languageDetails.language as string} 
            genre={bookData.genreDetails.genre as string} description={bookData.description as string} imageUrl={bookData.image?.url as string} />)
    }

    return(
        <TableCell sx={{marginLeft: '20px'}}>
            <Tooltip title={"Loan Book"} arrow>
                <IconButton disabled={StatusDetectionForBook((Information as LoanBookInterface).status, "Returned")} onClick={openLoanBookModal}>
                    <EventAvailableIcon />
                </IconButton>
            </Tooltip>

            <Tooltip title={"Favourite"} arrow>
                <IconButton>
                    <StarBorderIcon />
                </IconButton>
            </Tooltip>
        </TableCell>
    );
}

export default ActionTableCellForUser;