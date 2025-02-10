import { FC } from "react";
import { IconButton, TableCell, Tooltip } from "@mui/material";
import { ActionTableCellInterface, BookDataInterface, UserDataInterface } from "../../../../Model/TablePageModel";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import { ModalProvider, useModal } from "../../../../Context/ModalContext";
import DeleteBookModal from "../../../Modal/Book/DeleteBookModal";
import DeleteUserModal from "../../../Modal/User/DeleteUserModal";
import EditUserModal from "../../../Modal/User/EditUserModal";
import EditBookModal from "../../../Modal/Book/EditBookModal";

const ActionTableCell: FC<ActionTableCellInterface> = ({ TableName, Information, isAdmin }) => {
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
                handleOpen(<DeleteUserModal {...Information as UserDataInterface} />);
                break;
        }
    }

    return (
        isAdmin ?
            <TableCell>
                <Tooltip title={"Edit"} arrow>
                    <IconButton sx={{ "&:hover": { backgroundColor: 'gray' } }} onClick={openEditModal}>
                        <EditIcon />
                    </IconButton>
                </Tooltip>

                <Tooltip title={"Delete"} arrow>
                    <IconButton sx={{ color: 'red', "&:hover": { color: 'rgb(240, 0, 0)', backgroundColor: 'gray' } }} onClick={openDeleteModal}>
                        <DeleteIcon />
                    </IconButton>
                </Tooltip>
            </TableCell>
            :
            <TableCell>
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
