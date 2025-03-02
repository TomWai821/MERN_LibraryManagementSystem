import { FC } from "react";
import { IconButton, TableCell, Tooltip } from "@mui/material";

// Icons in MUI
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import BlockIcon from '@mui/icons-material/Block';
import { ActionTableCellInterface, BookDataInterface, UserDataInterface } from "../../../Model/TablePageModel";
import { useModal } from "../../../Context/ModalContext";
import EditBookModal from "../../Modal/Book/EditBookModal";
import DeleteBookModal from "../../Modal/Confirmation/Book/DeleteBookConfirmModal";
import EditUserModal from "../../Modal/User/EditUserModal";
import DeleteUserConfirmModal from "../../Modal/Confirmation/User/DeleteUserConfirmModal";
import BanUserModal from "../../Modal/User/BanUserModal";
import { DeleteButton } from "../../../Maps/FormatSyntaxMaps";
import { UserResultDataInterface } from "../../../Model/ResultModel";

const ActionTableCell: FC<ActionTableCellInterface> = ({ TableName, Information, isAdmin }) => 
{

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
                handleOpen(<DeleteUserConfirmModal {...Information as UserDataInterface} />);
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
                <Tooltip title={"Edit"} arrow>
                    <IconButton sx={{ "&:hover": { backgroundColor: 'lightGray' } }} onClick={openEditModal}>
                        <EditIcon />
                    </IconButton>
                </Tooltip>

                <Tooltip title={"Delete (Actual)"} arrow>
                    <IconButton sx={{ color: 'red', "&:hover": { color: DeleteButton.backgroundColor, backgroundColor: 'lightGray' } }} onClick={openDeleteModal}>
                        <DeleteIcon />
                    </IconButton>
                </Tooltip>

                {
                    (TableName === "User") ? 
                    <Tooltip title={"Ban User"} arrow>
                        <IconButton sx={{ color: 'red', "&:hover": { color: DeleteButton.backgroundColor, backgroundColor: 'lightGray' } }} onClick={openBannedModal}>
                            <BlockIcon />
                        </IconButton>
                    </Tooltip>:<></>
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
