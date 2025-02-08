import { FC } from "react";

import { IconButton, TableCell, Tooltip } from "@mui/material";

import { ActionTableCellInterface } from "../../../../Model/TablePageModel";

import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import StarBorderIcon from '@mui/icons-material/StarBorder';

/*
const openEditModal = (TableName, Information) => 
{

}

const openDeleteModal = (TableName, Information) => 
{

}
*/

const ActionTableCell: FC<ActionTableCellInterface> = ({TableName, Information, isAdmin}) => 
{
    return(
        isAdmin?
        <TableCell>
            <Tooltip title={"Edit"} arrow>
                <IconButton sx={{"&:hover":{backgroundColor: 'gray'}}} /*onClick={() => openEditModal(TableName, Information)}*/>
                    <EditIcon/>
                </IconButton>
            </Tooltip>

            <Tooltip title={"Delete"} arrow>
                <IconButton sx={{color: 'red', "&:hover":{color: 'rgb(240, 0, 0)', backgroundColor: 'gray'}}} /* onClick={() => openDeleteModal(TableName, Information)}*/>
                    <DeleteIcon/>
                </IconButton>
            </Tooltip>
        </TableCell>
        :
        <TableCell>
            <Tooltip title={"Booking"} arrow>
                <IconButton>
                    <EventAvailableIcon/>
                </IconButton>
            </Tooltip>

            <Tooltip title={"Favourite"} arrow>
                <IconButton>
                    <StarBorderIcon/>
                </IconButton>
            </Tooltip>
        </TableCell>
    );
}

export default ActionTableCell