import { FC } from "react";
import { TableCell } from "@mui/material";

// Another Modal
import DisplayUserDataModal from "../Modal/User/DisplayUserDataModal";

// Context
import { useModal } from "../../Context/ModalContext";

// Models
import { ContentTableCellProps } from "../../Model/ContextAndProviderModel";
import { BookDataInterface, UserResultDataInterface } from "../../Model/ResultModel";
import DisplayBookDataModal from "../Modal/Book/DisplayBookDataModal";

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
                handleOpen(<DisplayBookDataModal value={value} data={Information as BookDataInterface} isAdmin={isAdmin} isLoggedIn={isLoggedIn}/>);
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