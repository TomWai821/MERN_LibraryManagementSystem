import { FC } from "react";
import { IconButton, TableCell, Tooltip } from "@mui/material"
import HistoryIcon from '@mui/icons-material/History';

import ReturnBookConfirmModal from "../../../../Modal/Confirmation/Book/ReturnBookConfirmModal";
import { LoanBookInterface } from "../../../../../Model/ResultModel";
import { useModal } from "../../../../../Context/ModalContext";
import { ReturnBookTableCellInterface } from "../../../../../Model/TablePagesAndModalModel";
import { StatusDetectionForBook } from "../../../../../Controller/OtherUsefulController";
import { ImportantActionButtonSyntax } from "../../../../../ArraysAndObjects/FormatSyntaxObjects";

const ReturnBookTableCell:FC<ReturnBookTableCellInterface> = (returnBookTableCellData) => 
{
    const {Information, isAdmin} = returnBookTableCellData;

    const {handleOpen} = useModal();

    const openReturnBookModal = () => 
    {
        handleOpen(<ReturnBookConfirmModal data={Information as LoanBookInterface} isAdmin={isAdmin} modalOpenPosition={"LoanBookTableCell"}/>);
    }

    const isDiable = () => 
    {
        const result = StatusDetectionForBook((Information as LoanBookInterface).status, "Returned");
        return result;
    }

    
    return(
        <TableCell>
            <Tooltip title={"Return Book"} arrow>
                <IconButton disabled={isDiable()} sx={ImportantActionButtonSyntax} onClick={openReturnBookModal}>
                    <HistoryIcon />
                </IconButton>
            </Tooltip>
        </TableCell>
    )
}

export default ReturnBookTableCell