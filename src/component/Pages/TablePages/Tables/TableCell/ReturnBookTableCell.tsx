import { FC } from "react";
import { IconButton, TableCell, Tooltip } from "@mui/material"
import HistoryIcon from '@mui/icons-material/History';

import ReturnBookConfirmModal from "../../../../Modal/Confirmation/Book/ReturnBookConfirmModal";
import { LoanBookInterface } from "../../../../../Model/ResultModel";
import { useModal } from "../../../../../Context/ModalContext";
import { ReturnBookTableCellInterface } from "../../../../../Model/TablePagesAndModalModel";
import { StatusDetectionForLoanedBook } from "../../../../../Controller/OtherUsefulController";

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
        const result = StatusDetectionForLoanedBook((Information as LoanBookInterface).status);
        console.log(result);
        return result;
    }

    
    return(
        <TableCell>
            <Tooltip title={"Return Book"} arrow>
                <IconButton disabled={isDiable()} onClick={openReturnBookModal}>
                    <HistoryIcon />
                </IconButton>
            </Tooltip>
        </TableCell>
    )
}

export default ReturnBookTableCell