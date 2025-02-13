import { FC } from "react";
import { IconButton, TableCell, Tooltip } from "@mui/material";

// Icons in MUI
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import StarBorderIcon from '@mui/icons-material/StarBorder';

import { useModal } from "../../../../Context/ModalContext";

// Modals
import DeleteBookModal from "../../../Modal/Confirmation/Book/DeleteBookConfirmModal";
import DeleteUserConfirmModal from "../../../Modal/Confirmation/Profile/DeleteUserConfirmModal";
import EditUserModal from "../../../Modal/User/EditUserModal";
import EditBookModal from "../../../Modal/Book/EditBookModal";

import { ActionTableCellInterface, BookDataInterface, UserDataInterface } from "../../../../Model/TablePageModel";

import { DeleteButton } from "../../../../Maps/FormatSyntaxMaps";

const ActionTableCell: FC<ActionTableCellInterface> = ({ TableName, Information, isAdmin }) => 
{
    const { handleOpen } = useModal();

    

    const openEditModal = () => {
        switch (TableName) 
        {
            case "Book":
                handleOpen(<EditBookModal {...Information as BookDataInterface} />);
                break;
            case "User":
                handleOpen(<EditUserModal {...Information as UserDataInterface} />);
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
                handleOpen(<DeleteUserConfirmModal {...Information as UserDataInterface} />);
                break;
        }
    }

    return (
        isAdmin ?
            <TableCell sx={{marginLeft: '20px'}}>
                <Tooltip title={"Edit"} arrow>
                    <IconButton sx={{ "&:hover": { backgroundColor: 'gray' } }} onClick={openEditModal}>
                        <EditIcon />
                    </IconButton>
                </Tooltip>

                <Tooltip title={"Delete"} arrow>
                    <IconButton sx={{ color: 'red', "&:hover": { color: DeleteButton.backgroundColor, backgroundColor: 'gray' } }} onClick={openDeleteModal}>
                        <DeleteIcon />
                    </IconButton>
                </Tooltip>
            </TableCell>
            :
            <TableCell sx={{marginLeft: '20px'}}>
                <Tooltip title={"Booking"} arrow>
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
