import { FC } from "react"
import { IconButton, TableCell, Tooltip } from "@mui/material";
import { Edit as EditIcon, Delete as DeleteIcon, Block as BlockIcon, LockOpen as LockOpenIcon, Restore as RestoreIcon } from '@mui/icons-material';

// Context
import { useModal } from "../../../../../Context/ModalContext";

// Useful function 
import { StatusDetectionForAllUser, StatusDetectionForBannedUser, StatusDetectionForDeleteUser } from "../../../../../Controller/OtherUsefulController";

// Another Modal
import EditUserModal from "../../../../Modal/User/EditUserModal";
import EditBookModal from "../../../../Modal/Book/EditBookModal";
import DeleteUserConfirmModal from "../../../../Modal/Confirmation/User/DeleteUserConfirmModal";
import DeleteBookModal from "../../../../Modal/Confirmation/Book/DeleteBookConfirmModal";
import BanUserModal from "../../../../Modal/User/SuspendUserModal";
import UndoUserActivityModal from "../../../../Modal/Confirmation/User/UndoUserActivityModal";

// Model
import { ActionTableCellInterface } from "../../../../../Model/TablePagesAndModalModel"
import { BookDataInterface, DetailsInterfaceForBannedAndDelete, UserResultDataInterface } from "../../../../../Model/ResultModel";

// Data(CSS Syntax)
import EditBanUserModal from "../../../../Modal/User/EditBanUserModal";
import { ImportantActionButtonSyntax } from "../../../../../ArraysAndObjects/FormatSyntaxObjects";

const ActionTableCellForAdmin: FC<ActionTableCellInterface> = (tableCellData) => 
{
    const { value, TableName, Information} = tableCellData;
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
                                description: data.description, imageUrl: data.imageUrl, filename: data.image?.filename}
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

    const openBannedModal = () => 
    {
        handleOpen(<BanUserModal {...Information as UserResultDataInterface}/>);
    }

    const openEditBanDataModal = () => 
    {
        const banData = userData.bannedDetails as DetailsInterfaceForBannedAndDelete;
        handleOpen(<EditBanUserModal value={value} editData={banData} compareData={banData}/>)
    } 

    const openUndoActionModal = () => 
    {
        handleOpen(<UndoUserActivityModal value={value} _id={userData._id} data={userData} />)
    }
    
    const UserActionTableCellForAdmin = 
    [
        [
            {title: "Edit", syntax:{ "&:hover": { backgroundColor: 'lightGray' }}, clickEvent:openEditModal, icon:<EditIcon />},
            {title: "Suspend User" , syntax:ImportantActionButtonSyntax, clickEvent:openBannedModal, icon:<BlockIcon />, disable: StatusDetectionForAllUser(userData.status).banned.disable},
            {title: "Move To Delete List", syntax:ImportantActionButtonSyntax, clickEvent:openDeleteModal, icon:<DeleteIcon />, disable: StatusDetectionForAllUser(userData.status).delete.disable}
        ],
        [
            {title: "Edit", syntax:{ "&:hover": { backgroundColor: 'lightGray' }}, clickEvent:openEditBanDataModal, icon:<EditIcon />, disable:StatusDetectionForBannedUser(userData.bannedDetails?.status as string)},
            {title: "Unban User", syntax:ImportantActionButtonSyntax, clickEvent:openUndoActionModal , icon:<LockOpenIcon />, disable:StatusDetectionForBannedUser(userData.bannedDetails?.status as string)},
        ],
        [
            {title: "UnDelete user", syntax:{ "&:hover": { backgroundColor: 'lightGray' } }, clickEvent:openUndoActionModal, icon:<RestoreIcon />, disable:StatusDetectionForDeleteUser(userData.deleteDetails?.status as string)},
            {title: "Delete(Actual)", syntax:ImportantActionButtonSyntax, clickEvent:openDeleteModal, icon:<DeleteIcon />, disable:StatusDetectionForDeleteUser(userData.deleteDetails?.status as string)},
        ]
    ]

    const BookActionTableCellForAdmin = 
    [
        {title: "Edit", syntax:{ "&:hover": { backgroundColor: 'lightGray' } }, clickEvent:openEditModal, icon:<EditIcon />},
        {title: "Delete (Actual)", syntax:ImportantActionButtonSyntax, clickEvent:openDeleteModal, icon:<DeleteIcon />},
    ]

    let actionsToRender: any[] = [];

    if(TableName === "User")
    {
        actionsToRender = UserActionTableCellForAdmin[value] || [];
    }
    else if
    (TableName === "Book" && value === 0)
    {
        actionsToRender = BookActionTableCellForAdmin;
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