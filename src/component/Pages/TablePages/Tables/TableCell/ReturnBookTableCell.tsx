import { FC } from "react";
import { IconButton, TableCell, Tooltip } from "@mui/material"
import HistoryIcon from '@mui/icons-material/History';

import ReturnBookConfirmModal from "../../../../Modal/Confirmation/Book/ReturnBookConfirmModal";
import { LoanBookInterface } from "../../../../../Model/ResultModel";
import { useModal } from "../../../../../Context/ModalContext";
import { ReturnBookTableCellInterface } from "../../../../../Model/TablePagesAndModalModel";
import { DisableValidationForLoanBook, StatusDetectionForBook } from "../../../../../Controller/OtherUsefulController";
import { ImportantActionButtonSyntax } from "../../../../../ArraysAndObjects/FormatSyntaxObjects";

const ReturnBookTableCell:FC<ReturnBookTableCellInterface> = (returnBookTableCellData) => 
{
    const {Information, isAdmin} = returnBookTableCellData;

    const {handleOpen} = useModal();

    const openReturnBookModal = () => 
    {
        handleOpen(<ReturnBookConfirmModal data={Information as LoanBookInterface} isAdmin={isAdmin as boolean} modalOpenPosition={"LoanBookTableCell"}/>);
    }

    return(
        <TableCell>
            <Tooltip title={"Return Book"} arrow>
                <IconButton disabled={DisableValidationForLoanBook(Information)} sx={ImportantActionButtonSyntax} onClick={openReturnBookModal}>
                    <HistoryIcon />
                </IconButton>
            </Tooltip>
        </TableCell>
    )
}

export default ReturnBookTableCell