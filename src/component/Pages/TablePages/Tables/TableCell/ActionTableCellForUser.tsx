import { IconButton, TableCell, Tooltip } from "@mui/material";

import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import StarBorderIcon from '@mui/icons-material/StarBorder';

const ActionTableCellForUser = () => 
{
    return(
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

export default ActionTableCellForUser;