import { FC } from "react";
import { TableCell } from "@mui/material";

// Another Modal
import DisplayUserDataModal from "../Modal/User/DisplayUserDataModal";

// Context
import { useModal } from "../../Context/ModalContext";

// Models
import { ContentTableCellProps } from "../../Model/ContextAndProviderModel";
import { BookDataInterface, ContactInterface, UserResultDataInterface } from "../../Model/ResultModel";
import DisplayBookDataModal from "../Modal/Book/DisplayBookDataModal";
import DisplayContactDataModal from "../Modal/Contact/DisplayContactDataModel";

const ContentTableCell:FC<ContentTableCellProps> = (contentTableCellData) => 
{
    const {children, TableName, value, isAdmin, Information, isLoggedIn} = contentTableCellData;
    const {handleOpen} = useModal();

    const onClick = () => 
    {
        switch(TableName)
        {
            case "User":
                handleOpen(<DisplayUserDataModal value={value} data={Information as UserResultDataInterface} isAdmin={isAdmin} />);
                break;
            
            case "Book":
                handleOpen(<DisplayBookDataModal position={"Table"} value={value} data={Information as BookDataInterface} isAdmin={isAdmin} isLoggedIn={isLoggedIn}/>);
                break;
            
            case "Contact":
                handleOpen(<DisplayContactDataModal value={value} data={Information as ContactInterface}/>);
                break;
        }
    }
    
    return(
        <TableCell sx={{ fontSize: '16px ', "&:hover": {cursor: "pointer"}}} onClick={onClick}>
            {children}
        </TableCell>
    );
}

export default ContentTableCell