import { FC, Fragment } from "react"
import { ActionTableCellInterface, BookDataInterface } from "../../../../../Model/TablePageModel"
import { IconButton, TableCell, Tooltip } from "@mui/material";

import { UserResultDataInterface } from "../../../../../Model/ResultModel";
import { useModal } from "../../../../../Context/ModalContext";
import { DeleteButton } from "../../../../../Maps/FormatSyntaxMaps";

import EditUserModal from "../../../../Modal/User/EditUserModal";
import EditBookModal from "../../../../Modal/Book/EditBookModal";
import DeleteUserConfirmModal from "../../../../Modal/Confirmation/User/DeleteUserConfirmModal";
import DeleteBookModal from "../../../../Modal/Confirmation/Book/DeleteBookConfirmModal";
import BanUserModal from "../../../../Modal/User/BanUserModal";

import { Edit as EditIcon, Delete as DeleteIcon, Block as BlockIcon, LockOpen as LockOpenIcon, Restore as RestoreIcon } from '@mui/icons-material';

const ActionTableCellForAdmin: FC<ActionTableCellInterface> = (tableCellData) => 
{
    const { value, TableName, Information } = tableCellData;

    const { handleOpen } = useModal();

    const openEditModal = () => 
    {
        switch (TableName) 
        {
            case "Book":
                const bookData = Information as BookDataInterface;
                handleOpen(<EditBookModal editData={bookData} compareData={bookData}  />);
                break;
            case "User":
                const userData = Information as UserResultDataInterface;
                handleOpen(<EditUserModal editData={userData} compareData={userData}/>);
                break;
        }
    }

    const openDeleteModal = () => 
    {
        switch (TableName) 
        {
            case "Book":
                handleOpen(<DeleteBookModal {...Information as BookDataInterface} />);
                break;
            case "User":
                handleOpen(<DeleteUserConfirmModal value={value} {...Information as UserResultDataInterface} />);
                break;
        }
    }

    const openUnDeleteModal = () => 
    {

    }

    const openBannedModal = () => 
    {
        handleOpen(<BanUserModal {...Information as UserResultDataInterface}/>);
    }

    const openUnbanModal = () => 
    {

    }
    
    const UserActionTableCellForAdmin = 
    [
        [
            {title: "Edit", syntax:{ "&:hover": { backgroundColor: 'lightGray' }}, clickEvent:openEditModal, icon:<EditIcon />},
            {title: "Move To Delete List", syntax:{ color: 'red', "&:hover": { color: DeleteButton.backgroundColor, backgroundColor: 'lightGray' } }, clickEvent:openDeleteModal, icon:<DeleteIcon />},
            {title: "Ban User", syntax:{ color: 'red', "&:hover": { color: DeleteButton.backgroundColor, backgroundColor: 'lightGray' } }, clickEvent:openBannedModal, icon:<BlockIcon />}
        ],
        [
            {title: "Edit", syntax:{ "&:hover": { backgroundColor: 'lightGray' }}, clickEvent:openEditModal, icon:<EditIcon />},
            {title: "Unban User", syntax:{ color: 'red', "&:hover": { color: DeleteButton.backgroundColor, backgroundColor: 'lightGray' } }, clickEvent:openUnbanModal , icon:<LockOpenIcon />},
        ],
        [
            {title: "UnDelete user", syntax:{ "&:hover": { backgroundColor: 'lightGray' } }, clickEvent:openUnDeleteModal, icon:<RestoreIcon />},
            {title: "Delete(Actual)", syntax:{ color: 'red', "&:hover": { color: DeleteButton.backgroundColor, backgroundColor: 'lightGray' } }, clickEvent:openDeleteModal, icon:<DeleteIcon />},
        ]
    ]

    const BookActionTableCellForAdmin = 
    [
        {title: "Edit", syntax:{ "&:hover": { backgroundColor: 'lightGray' } }, clickEvent:openEditModal, icon:<EditIcon />},
        {title: "Delete(Actual)", syntax:{ color: 'red', "&:hover": { color: DeleteButton.backgroundColor, backgroundColor: 'lightGray' } }, clickEvent:openDeleteModal, icon:<DeleteIcon />},
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
                        <IconButton sx={actions.syntax} onClick={actions.clickEvent}>
                            {actions.icon}
                        </IconButton>
                    </Tooltip>
                ))
            }
        </TableCell>
    );
}

export default ActionTableCellForAdmin