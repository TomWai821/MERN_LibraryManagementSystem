import { FC } from "react"
import { IconButton, TableCell, Tooltip } from "@mui/material";
import { Edit as EditIcon, Delete as DeleteIcon, Block as BlockIcon, LockOpen as LockOpenIcon, Restore as RestoreIcon, History as HistoryIcon } from '@mui/icons-material';

// Context
import { useModal } from "../../../../../Context/ModalContext";

// Useful function 
import { StatusDetectionForAllUser, StatusDetectionForLoanedBook } from "../../../../../Controller/OtherUsefulController";

// Another Modal
import EditUserModal from "../../../../Modal/User/EditUserModal";
import EditBookModal from "../../../../Modal/Book/EditBookModal";
import DeleteUserConfirmModal from "../../../../Modal/Confirmation/User/DeleteUserConfirmModal";
import DeleteBookModal from "../../../../Modal/Confirmation/Book/DeleteBookConfirmModal";
import SuspendUserModal from "../../../../Modal/User/SuspendUserModal";
import UndoUserActivityModal from "../../../../Modal/Confirmation/User/UndoUserActivityModal";

// Model
import { ActionTableCellInterface } from "../../../../../Model/TablePagesAndModalModel"
import { BookDataInterface, DetailsInterfaceForSuspendAndDelete, LoanBookInterface, UserResultDataInterface } from "../../../../../Model/ResultModel";

// Data(CSS Syntax)

import { ImportantActionButtonSyntax } from "../../../../../ArraysAndObjects/FormatSyntaxObjects";
import EditSuspendUserModal from "../../../../Modal/User/EditSuspendUserModal";
import ReturnBookConfirmModal from "../../../../Modal/Confirmation/Book/ReturnBookConfirmModal";

const ActionTableCellForAdmin: FC<ActionTableCellInterface> = (tableCellData) => 
{
    const { isAdmin, value, TableName, Information } = tableCellData;
    const userData = Information as UserResultDataInterface;

    const { handleOpen } = useModal();

    const openEditModal = () => 
    {
        switch (TableName) 
        {
            case "Book":
                const data = Information as BookDataInterface;
                const Data = { _id: data._id, bookname: data.bookname, 
                                language: data.languageDetails.language as string, languageID: data.languageDetails._id, 
                                genre: data.genreDetails.genre as string, genreID: data.genreDetails._id, 
                                author: data.authorDetails.author as string, authorID: data.authorDetails._id,
                                publisher: data.publisherDetails.publisher as string, publisherID: data.publisherDetails._id, 
                                description: data.description, imageUrl: data.image?.url, filename: data.image?.filename}
                handleOpen(<EditBookModal value={value} editData={Data} compareData={Data}/>);
                break;
                
            case "User":
                handleOpen(<EditUserModal value={value} editData={userData} compareData={userData}/>);
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
        }
    }

    const openSuspendModal = () => 
    {
        handleOpen(<SuspendUserModal {...Information as UserResultDataInterface}/>);
    }

    const openEditSuspendDataModal = () => 
    {
        const banData = userData.bannedDetails as DetailsInterfaceForSuspendAndDelete;
        handleOpen(<EditSuspendUserModal value={value} editData={banData} compareData={banData}/>)
    } 

    const openUndoActionModal = () => 
    {
        handleOpen(<UndoUserActivityModal value={value} _id={userData._id} data={userData} />)
    }

    const openReturnBookModal = () => 
    {
        handleOpen(<ReturnBookConfirmModal data={Information as LoanBookInterface} isAdmin={isAdmin} modalOpenPosition={"AdminTableCell"}/>);
    }
    
    const UserActionTableCellForAdmin = 
    [
        [
            {title: "Edit", syntax:{ "&:hover": { backgroundColor: 'lightGray' }}, clickEvent:openEditModal, icon:<EditIcon />},
            {title: "Suspend User" , syntax:ImportantActionButtonSyntax, clickEvent:openSuspendModal, icon:<BlockIcon />, disable: StatusDetectionForAllUser(userData.status).banned.disable},
            {title: "Move To Delete List", syntax:ImportantActionButtonSyntax, clickEvent:openDeleteModal, icon:<DeleteIcon />, disable: StatusDetectionForAllUser(userData.status).delete.disable}
        ],
        [
            {title: "Edit", syntax:{ "&:hover": { backgroundColor: 'lightGray' }}, clickEvent:openEditSuspendDataModal, icon:<EditIcon />},
            {title: "Unsuspend User", syntax:ImportantActionButtonSyntax, clickEvent:openUndoActionModal , icon:<LockOpenIcon />},
        ],
        [
            {title: "UnDelete user", syntax:{ "&:hover": { backgroundColor: 'lightGray' } }, clickEvent:openUndoActionModal, icon:<RestoreIcon />},
            {title: "Delete(Actual)", syntax:ImportantActionButtonSyntax, clickEvent:openDeleteModal, icon:<DeleteIcon />},
        ]
    ]

    const BookActionTableCellForAdmin = 
    [
        [
            {title: "Edit", syntax:{ "&:hover": { backgroundColor: 'lightGray' } }, clickEvent:openEditModal, icon:<EditIcon />},
            {title: "Delete (Actual)", syntax:ImportantActionButtonSyntax, clickEvent:openDeleteModal, icon:<DeleteIcon />},
        ],
        [
            {title: "Return Book", syntax:ImportantActionButtonSyntax, clickEvent:openReturnBookModal, icon:<HistoryIcon />, disable: StatusDetectionForLoanedBook((Information as LoanBookInterface).status)},
        ]
    ]

    let actionsToRender: any[] = [];

    if(TableName === "User")
    {
        actionsToRender = UserActionTableCellForAdmin[value] || [];
    }
    else if
    (TableName === "Book")
    {
        actionsToRender = BookActionTableCellForAdmin[value];
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