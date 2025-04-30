import { FC, useContext } from "react";
import { IconButton, TableCell, Tooltip } from "@mui/material";

import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarIcon from '@mui/icons-material/Star';

import { StatusDetectionForBook } from "../../../../../Controller/OtherUsefulController";
import { UserActionTableCellInterface } from "../../../../../Model/TablePagesAndModalModel";

import LoanBookConfirmationModal from "../../../../Modal/Confirmation/Book/LoanBookConfirmationModal";

import { BookDataInterface, LoanBookInterface } from "../../../../../Model/ResultModel";

import { useModal } from "../../../../../Context/ModalContext";
import { AlertContext } from "../../../../../Context/AlertContext";
import { useBookContext } from "../../../../../Context/Book/BookContext";

const ActionTableCellForUser:FC<UserActionTableCellInterface> = (actionTableCellData) => 
{
    const {handleOpen} = useModal();
    const {BookRecordForUser, favouriteBook, unfavouriteBook} = useBookContext();
    
    const {Information} = actionTableCellData;

    const alertContext = useContext(AlertContext);

    const isFavourite = BookRecordForUser[1].find((favouriteBook) => favouriteBook.bookDetails?._id === (Information as BookDataInterface)._id);
    const FavouriteID = BookRecordForUser[1].find((favouriteBook) => favouriteBook.bookDetails?._id === (Information as BookDataInterface)._id as string)?._id;

    const openLoanBookModal = () => 
    {
        const bookData = Information as BookDataInterface;
        handleOpen(<LoanBookConfirmationModal _id={bookData._id} bookname={bookData.bookname} author={bookData.author as string}
            language={bookData.languageDetails.language as string} genre={bookData.genreDetails.genre as string} 
            description={bookData.description as string} imageUrl={bookData.image?.url as string} />)
    }

    const FavouriteHandler = async () => 
    {
        let response = isFavourite ? unfavouriteBook(FavouriteID as string) : favouriteBook((Information as BookDataInterface)._id); 
        const favouriteText = isFavourite ? "Unfavourite" : "Favourite";

        if (alertContext && alertContext.setAlertConfig) 
        {
            if (await response) 
            {
                alertContext.setAlertConfig({ AlertType: "success", Message: `${favouriteText} successfully!`, open: true, onClose: () => alertContext.setAlertConfig(null) });
            } 
            else 
            {
                alertContext.setAlertConfig({ AlertType: "error", Message: `Failed to ${favouriteText}! Please try again`, open: true, onClose: () => alertContext.setAlertConfig(null) });
            }
        }
    }

    const FavouriteIconSyntax = () => 
    {
        return isFavourite ? { "&:hover": { backgroundColor: 'lightGray' }, color: 'gold' } : { "&:hover": { backgroundColor: 'lightGray' } };
    }

    return(
        <TableCell sx={{marginLeft: '20px'}}>
            <Tooltip title={isFavourite ? "Unfavourite" : "Favourite"} arrow>
                <IconButton onClick={FavouriteHandler} sx={FavouriteIconSyntax}>
                    {isFavourite ? <StarIcon/>: <StarBorderIcon />}
                </IconButton>
            </Tooltip>
        </TableCell>
    );
}

export default ActionTableCellForUser;