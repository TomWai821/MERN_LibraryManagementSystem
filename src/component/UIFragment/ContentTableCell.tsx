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
    const {children, TableName, value, textColor, Information} = contentTableCellData;
    const {handleOpen} = useModal();
    
    const onClick = () => 
    {
        switch(TableName)
        {
            case "User":
                handleOpen(<DisplayUserDataModal value={value} data={Information as UserResultDataInterface} />);
                break;
            
            case "Book":
                handleOpen(<DisplayBookDataModal position={"Table"} value={value} data={Information as BookDataInterface}/>);
                break;
        }
    }
    
    return(
        <TableCell sx={{ fontSize: '16px', color: textColor , "&:hover": {cursor: "pointer"}}} onClick={onClick}>
            {children}
        </TableCell>
    );
}

export default ContentTableCell