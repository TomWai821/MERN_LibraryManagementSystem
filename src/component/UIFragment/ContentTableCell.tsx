import { FC } from "react";
import { TableCell } from "@mui/material";

// Another Modal
import DisplayUserDataModal from "../Modal/User/DisplayUserDataModal";

// Context
import { useModal } from "../../Context/ModalContext";

// Models
import { ContentTableCellProps } from "../../Model/ContextAndProviderModel";


const ContentTableCell:FC<ContentTableCellProps> = (contentTableCellData) => 
{
    const {children, TableName, value, isAdmin, Information} = contentTableCellData;
    const {handleOpen} = useModal();

    const onClick = () => 
    {
        switch(TableName)
        {
            case "User":
                handleOpen(<DisplayUserDataModal value={value} data={Information} isAdmin={isAdmin} />);
                break;
            
            case "Book":
                break;
        }
    }
    
    return(
        <TableCell sx={{"&:hover": {cursor: "pointer"}}} onClick={onClick}>
            {children}
        </TableCell>
    );
}

export default ContentTableCell