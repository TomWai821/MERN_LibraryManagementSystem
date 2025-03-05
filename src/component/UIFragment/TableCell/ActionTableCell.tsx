import { FC, Fragment } from "react";
import { IconButton, TableCell, Tooltip } from "@mui/material";

// Icons in MUI
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import BlockIcon from '@mui/icons-material/Block';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import UndoIcon from '@mui/icons-material/Undo'

import { ActionTableCellInterface, BookDataInterface } from "../../../Model/TablePageModel";
import { useModal } from "../../../Context/ModalContext";

import EditBookModal from "../../Modal/Book/EditBookModal";
import DeleteBookModal from "../../Modal/Confirmation/Book/DeleteBookConfirmModal";
import EditUserModal from "../../Modal/User/EditUserModal";
import DeleteUserConfirmModal from "../../Modal/Confirmation/User/DeleteUserConfirmModal";
import BanUserModal from "../../Modal/User/BanUserModal";

import { DeleteButton } from "../../../Maps/FormatSyntaxMaps";
import { UserResultDataInterface } from "../../../Model/ResultModel";

const ActionTableCell: FC<ActionTableCellInterface> = ({ value, TableName, Information, isAdmin }) => 
{

    const { handleOpen } = useModal();
    const InAllUserTable = (TableName === "User" && value === 0);
    const InBannedUserTable = (TableName === "User" && value === 1);
    const InDeleteUserTable = (TableName === "User" && value === 2);
    const InAllBookTable = (TableName === "Book" && value === 0);
    const InIssueUserTable = (TableName === "Book" && value === 1);
    const InReturnUserTable = (TableName === "Book" && value === 2);

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

    const openUnBanModal = () => 
    {

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

    const openBannedModal = () => 
    {
        handleOpen(<BanUserModal {...Information as UserResultDataInterface}/>);
    }

    return (
        isAdmin ?
            <TableCell sx={{marginLeft: '20px'}}>
                {   (InAllUserTable || InBannedUserTable || InAllBookTable) && 
                    (
                        <Tooltip title={"Edit"} arrow>
                            <IconButton sx={{ "&:hover": { backgroundColor: 'lightGray' } }} onClick={openEditModal}>
                                <EditIcon />
                            </IconButton>
                        </Tooltip>
                    )
                }
                {
                    (TableName === "User") &&
                    (
                        (value === 0) && 
                        (
                            <Fragment>
                                <Tooltip title={"Move To Delete List"} arrow>
                                    <IconButton sx={{ color: 'red', "&:hover": { color: DeleteButton.backgroundColor, backgroundColor: 'lightGray' } }} onClick={openDeleteModal}>
                                        <DeleteIcon />
                                    </IconButton>
                                </Tooltip>

                                <Tooltip title={"Ban User"} arrow>
                                    <IconButton sx={{ color: 'red', "&:hover": { color: DeleteButton.backgroundColor, backgroundColor: 'lightGray' } }} onClick={openBannedModal}>
                                        <BlockIcon />
                                    </IconButton>      
                                </Tooltip>
                            </Fragment>  
                        ) 
                        ||
                        (value === 1) && 
                        (
                            <Tooltip title={"Unban User"} arrow>
                                <IconButton sx={{ color: 'green', "&:hover": { color: 'darkgreen', backgroundColor: 'lightGray' } }} onClick={openBannedModal}>
                                    <LockOpenIcon />
                                </IconButton>      
                            </Tooltip>
                        )
                    )
                }
                {
                    
                    ( InDeleteUserTable || InAllBookTable ) && 
                    (
                
                        <Tooltip title={"Delete(Actual)"} arrow>
                            <IconButton sx={{ color: 'red', "&:hover": { color: DeleteButton.backgroundColor, backgroundColor: 'lightGray' } }} onClick={openDeleteModal}>
                                <DeleteIcon />
                            </IconButton>
                        </Tooltip>
                    )
                }
    
            </TableCell>
            :
            <TableCell sx={{marginLeft: '20px'}}>
                <Tooltip title={"Issue Book"} arrow>
                    <IconButton>
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

export default ActionTableCell;
