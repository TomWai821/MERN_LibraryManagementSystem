import { FC, useContext } from "react"
import { IconButton, TableCell, Tooltip } from "@mui/material";
import { Edit as EditIcon, Delete as DeleteIcon, Block as BlockIcon, LockOpen as LockOpenIcon, History as HistoryIcon, EventAvailable as EventAvailableIcon, Search as SearchIcon } from '@mui/icons-material';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarIcon from '@mui/icons-material/Star';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';

// Context
import { useModal } from "../../../../../Context/ModalContext";

// Useful function 
import { DisableValidationForLoanBook, StatusDetectionForAllUser, StatusDetectionForBook } from "../../../../../Controller/OtherUsefulController";

// Another Modal
import EditUserModal from "../../../../Modal/User/EditUserModal";
import EditBookModal from "../../../../Modal/Book/EditBookModal";
import DeleteUserConfirmModal from "../../../../Modal/Confirmation/User/DeleteUserConfirmModal";
import DeleteBookModal from "../../../../Modal/Confirmation/Book/DeleteBookConfirmModal";
import SuspendUserModal from "../../../../Modal/User/SuspendUserModal";
import UndoUserActivityModal from "../../../../Modal/Confirmation/User/UndoUserActivityModal";
import EditSuspendUserModal from "../../../../Modal/User/EditSuspendUserModal";
import ReturnBookConfirmModal from "../../../../Modal/Confirmation/Book/ReturnBookConfirmModal";
import DeleteContactConfirmModal from "../../../../Modal/Confirmation/Contact/DeleteContactConfirmModal";
import EditContactModal from "../../../../Modal/Contact/EditContactModal";
import LoanBookConfirmationModal from "../../../../Modal/Confirmation/Book/LoanBookConfirmationModal";

// Model
import { ActionTableCellInterface } from "../../../../../Model/TablePagesAndModalModel"
import { BookDataInterface, DetailsInterfaceForSuspend, LoanBookInterface, UserResultDataInterface } from "../../../../../Model/ResultModel";

// Data(CSS Syntax)
import { ImportantActionButtonSyntax } from "../../../../../ArraysAndObjects/FormatSyntaxObjects";
import { useBookContext } from "../../../../../Context/Book/BookContext";
import { AlertContext } from "../../../../../Context/AlertContext";
import SubmitFinesConfirmModal from "../../../../Modal/Confirmation/Book/SubmitFineConfirmation";
import { BookSearchInterface } from "../../../../../Model/BookTableModel";

const ActionTableCellForAdmin: FC<ActionTableCellInterface> = ({...tableCellData}) => 
{
    const { handleOpen } = useModal();
    const {BookRecordForUser, favouriteBook, unfavouriteBook, fetchLoanBookWithFliterData} = useBookContext();
    const alertContext = useContext(AlertContext);


    const { isAdmin, value, TableName, Information, changeValue, setSearchBook, searchBook } = tableCellData;
    const userData = Information as UserResultDataInterface;
    
    const isFavourite = BookRecordForUser[1].find((favouriteBook) => favouriteBook.bookDetails?._id === (Information as BookDataInterface)._id);
    const FavouriteID = BookRecordForUser[1].find((favouriteBook) => favouriteBook.bookDetails?._id === (Information as BookDataInterface)._id as string)?._id;

    const openEditModal = () => 
    {
        switch (TableName) 
        {
            case "Book":
                const data = Information as BookDataInterface;
                const Data = 
                            { 
                                _id: data._id, bookname: data.bookname, language: data.languageDetails.language as string,
                                genre: data.genreDetails.genre as string, author: data.authorDetails.author as string,
                                publisher: data.publisherDetails.publisher as string, publishDate: data.publishDate, description: data.description, 
                                imageUrl: data.image?.url, filename: data.image?.filename
                            }
                handleOpen(<EditBookModal value={value} editData={Data} compareData={Data}/>);
                break;
                
            case "User":
                handleOpen(<EditUserModal value={value} editData={userData} compareData={userData}/>);
                break;

            case "Contact":
                handleOpen(<EditContactModal value={value} editData={Information} compareData={Information}/>);
                break;
        }
    }

    const openDeleteModal = () => 
    {
        switch (TableName) 
        {
            case "Book":
                const data = Information as BookDataInterface;
                handleOpen(
                    <DeleteBookModal 
                        bookID={data._id} description={data.description} bookname={data.bookname}
                        language={data.languageDetails.language as string} 
                        genre={data.genreDetails.genre as string} 
                        author={data.authorDetails.author as string} 
                        publisher={data.publisherDetails.publisher as string}
                    />
                );
                break;

            case "User":
                handleOpen(<DeleteUserConfirmModal value={value} _id={userData._id} data={userData} />);
                break;

            case "Contact":
                handleOpen(<DeleteContactConfirmModal value={value} _id={(Information as LoanBookInterface)._id} data={Information}/>);
                break;
        }
    }

    const openSuspendModal = () => 
    {
        handleOpen(<SuspendUserModal {...Information as UserResultDataInterface}/>);
    }

    const openEditSuspendDataModal = () => 
    {
        const banData = userData.bannedDetails as DetailsInterfaceForSuspend;
        handleOpen(<EditSuspendUserModal value={value} editData={banData} compareData={banData}/>)
    } 

    const openUndoActionModal = () => 
    {
        handleOpen(<UndoUserActivityModal _id={userData._id} data={userData} />)
    }

    const openReturnBookModal = () => 
    {
        handleOpen(<ReturnBookConfirmModal data={Information as LoanBookInterface} isAdmin={isAdmin as boolean} modalOpenPosition={"AdminTableCell"}/>);
    }

    const openSubmitFinesModal = () => 
    {
        handleOpen(<SubmitFinesConfirmModal modalOpenPosition={""} isAdmin={isAdmin as boolean} data={Information as LoanBookInterface}/>);
        console.log(((Information as LoanBookInterface).finesPaid !== "Not Paid" && (Information as LoanBookInterface).status !== "Returned(Late)"));
    }

    const openLoanBookModal = () => 
    {
        const bookData = Information as BookDataInterface;
        handleOpen(<LoanBookConfirmationModal tabValue={0} _id={bookData._id} bookname={bookData.bookname} author={bookData.authorDetails.author as string} 
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

    const ViewLoanRecord = () => 
    {
        if (changeValue && setSearchBook) 
        {
            fetchLoanBookWithFliterData("AllUser", (Information as BookDataInterface).bookname);
            changeValue("Tab", 1);
            setSearchBook({ ...searchBook as BookSearchInterface, bookname: (Information as BookDataInterface).bookname });
        }
        else 
        {
            console.error("changeValue is undefined.");
        }
    };

    const FavouriteIconSyntax = () => 
    {
        return isFavourite ? { "&:hover": { backgroundColor: 'lightGray' }, color: 'gold' } : { "&:hover": { backgroundColor: 'lightGray' } };
    }
    
    const UserActionTableCellForAdmin = 
    [
        [
            {title: "Edit", syntax:{ "&:hover": { backgroundColor: 'lightGray' }}, clickEvent:openEditModal, icon:<EditIcon />},
            {title: "Suspend User" , syntax:ImportantActionButtonSyntax, clickEvent:openSuspendModal, icon:<BlockIcon />, disable: StatusDetectionForAllUser(userData.status).banned.disable},
            {title: "Delete User", syntax:ImportantActionButtonSyntax, clickEvent:openDeleteModal, icon:<DeleteIcon />, disable: StatusDetectionForAllUser(userData.status).delete.disable}
        ],
        [
            {title: "Edit", syntax:{ "&:hover": { backgroundColor: 'lightGray' }}, clickEvent:openEditSuspendDataModal, icon:<EditIcon />},
            {title: "Unsuspend User", syntax:ImportantActionButtonSyntax, clickEvent:openUndoActionModal , icon:<LockOpenIcon />},
        ]
    ]

    const BookActionTableCellForAdmin = 
    [
        [
            {title: "Edit", syntax:{ "&:hover": { backgroundColor: 'lightGray' } }, clickEvent:openEditModal, icon:<EditIcon />},
            {title: "Delete (Actual)", syntax:ImportantActionButtonSyntax, clickEvent:openDeleteModal, icon:<DeleteIcon />},
            {title: "View Loan Book History",  syntax: { "&:hover": { backgroundColor: 'lightGray' } }, 
                clickEvent: ViewLoanRecord, icon: <SearchIcon/>},
            {title: "Loan Book", syntax:{ "&:hover": { backgroundColor: 'lightGray' } }, clickEvent:openLoanBookModal, icon:<EventAvailableIcon />, 
                disable: StatusDetectionForBook((Information as LoanBookInterface).status, "Loaned")},
            {title: isFavourite ? "Unfavourite" : "Favourite",  syntax: FavouriteIconSyntax, 
                clickEvent: FavouriteHandler, icon: isFavourite ? <StarIcon/> : <StarBorderIcon />}
        ],
        [
            {title: "Return Book", syntax:ImportantActionButtonSyntax, clickEvent:openReturnBookModal, icon:<HistoryIcon />, 
                disable: DisableValidationForLoanBook(Information as LoanBookInterface)},
            {title: "Submit fines", syntax:ImportantActionButtonSyntax, clickEvent:openSubmitFinesModal, icon:<AttachMoneyIcon />, 
                disable: ((Information as LoanBookInterface).status !== "Returned(Late)")}
        ]
    ]

    const ContactActionTableCellForAdmin = 
    [
        [
            {title: "Edit", syntax:{ "&:hover": { backgroundColor: 'lightGray' }}, clickEvent:openEditModal, icon:<EditIcon />},
            {title: "Delete Author", syntax:ImportantActionButtonSyntax, clickEvent:openDeleteModal , icon:<DeleteIcon />},
        ],
        [
            {title: "Edit", syntax:{ "&:hover": { backgroundColor: 'lightGray' }}, clickEvent:openEditModal, icon:<EditIcon />},
            {title: "Delete Publisher", syntax:ImportantActionButtonSyntax, clickEvent:openDeleteModal , icon:<DeleteIcon />},
        ],
    ]

    let actionsToRender: any[] = [];
    
    switch(TableName)
    {
        case "User":
            actionsToRender = UserActionTableCellForAdmin[value];
            break;

        case "Book":
            actionsToRender = BookActionTableCellForAdmin[value];
            break;

        case "Contact":
            actionsToRender = ContactActionTableCellForAdmin[value];
            break;
    }

    return(
        <TableCell sx={{marginLeft: '20px'}}>
            {
                actionsToRender.map((actions, index) => 
                (
                    <Tooltip title={actions.title} key={index} arrow>
                        <IconButton sx={actions.syntax} onClick={actions.clickEvent} disabled={actions.disable}>
                            {actions.icon}
                        </IconButton>
                    </Tooltip>
                ))
            }
        </TableCell>
    );
}

export default ActionTableCellForAdmin