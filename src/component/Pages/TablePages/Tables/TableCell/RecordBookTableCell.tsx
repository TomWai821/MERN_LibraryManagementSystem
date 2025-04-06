import { FC, Fragment, useContext } from "react";
import { IconButton, TableCell, Tooltip } from "@mui/material"

import HistoryIcon from '@mui/icons-material/History';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import StarIcon from "@mui/icons-material/Star"

import { useModal } from "../../../../../Context/ModalContext";

// Other Modals
import ReturnBookConfirmModal from "../../../../Modal/Confirmation/Book/ReturnBookConfirmModal";
import LoanBookConfirmationModal from "../../../../Modal/Confirmation/Book/LoanBookConfirmationModal";

// Models
import { LoanBookInterface } from "../../../../../Model/ResultModel";
import { RecordTableCellInterface } from "../../../../../Model/TablePagesAndModalModel";

// Controllers
import { DisableValidationForLoanBook, StatusDetectionForBook } from "../../../../../Controller/OtherUsefulController";


import { ImportantActionButtonSyntax } from "../../../../../ArraysAndObjects/FormatSyntaxObjects";
import { useBookContext } from "../../../../../Context/Book/BookContext";
import { AlertContext } from "../../../../../Context/AlertContext";


const RecordBookTableCell:FC<RecordTableCellInterface> = (returnBookTableCellData) => 
{
    const {value, Information, isAdmin} = returnBookTableCellData;

    const {handleOpen} = useModal();
    const {unfavouriteBook} = useBookContext();
    const alertContext = useContext(AlertContext);

    const openReturnBookModal = () => 
    {
        handleOpen(<ReturnBookConfirmModal data={Information as LoanBookInterface} isAdmin={isAdmin as boolean} modalOpenPosition={"LoanBookTableCell"}/>);
    }

    const openLoanBookModal = () => 
    {
        handleOpen(<LoanBookConfirmationModal _id={Information.bookDetails?._id as string} bookname={Information.bookDetails?.bookname as string} author={Information.authorDetails?.author as string}
            language={Information.languageDetails?.language as string} genre={Information.genreDetails?.genre as string}
            description={Information.bookDetails?.description as string} imageUrl={Information.bookDetails?.image?.url as string} />)
    }

    const unfavourite = async () => 
    {
        const response = unfavouriteBook(Information._id);
        
        if (alertContext && alertContext.setAlertConfig) 
        {
            if (await response) 
            {
                alertContext.setAlertConfig({ AlertType: "success", Message: "Unfavourite successfully!", open: true, onClose: () => alertContext.setAlertConfig(null) });
            } 
            else 
            {
                alertContext.setAlertConfig({ AlertType: "error", Message: "Failed to Unfavourite! Please try again", open: true, onClose: () => alertContext.setAlertConfig(null) });
            }
        }
    }

    return(
        <TableCell>
            {
                value === 0 &&
                <Tooltip title={"Return Book"} arrow>
                    <IconButton disabled={DisableValidationForLoanBook(Information)} sx={ImportantActionButtonSyntax} onClick={openReturnBookModal}>
                        <HistoryIcon />
                    </IconButton>
                </Tooltip>
            }

            {
                value === 1 &&
                <Fragment>
                    <Tooltip title={"Loan Book"} arrow>
                        <IconButton disabled={StatusDetectionForBook((Information as LoanBookInterface).bookDetails?.status as string, "Loaned")} onClick={openLoanBookModal}>
                            <EventAvailableIcon />
                        </IconButton>
                    </Tooltip>
                    {
                        <Tooltip title={"Unfavourite"} arrow>
                            <IconButton sx={{color: "gold"}} onClick={unfavourite}>
                                <StarIcon />
                            </IconButton>
                        </Tooltip>
                    }
                </Fragment>
            }
        </TableCell>
    )
}

export default RecordBookTableCell