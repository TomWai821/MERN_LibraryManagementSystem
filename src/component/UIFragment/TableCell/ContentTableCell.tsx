import { FC } from "react";
import { TableCell } from "@mui/material";

import { ChildProps } from "../../../Model/ContextAndProviderModel";

const ContentTableCell:FC<ChildProps> = ({children}) => 
{
    return(
        <TableCell sx={{"&:hover": {cursor: "pointer"}}}>
            {children}
        </TableCell>
    );
}

export default ContentTableCell