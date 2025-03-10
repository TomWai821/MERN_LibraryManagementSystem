import { FC } from "react";

import { ActionTableCellInterface } from "../../Model/TablePagesAndModalModel";
import ActionTableCellForUser from "../Pages/TablePages/Tables/TableCell/ActionTableCellForUser";
import ActionTableCellForAdmin from "../Pages/TablePages/Tables/TableCell/ActionTableCellForAdmin";

const ActionTableCellManager: FC<ActionTableCellInterface> = (tableCellData) => 
{
    const { value, TableName, Information, isAdmin } = tableCellData;

    return (
        isAdmin ? <ActionTableCellForAdmin value={value} TableName={TableName} Information={Information} isAdmin={isAdmin}/> : <ActionTableCellForUser/>
    );
}

export default ActionTableCellManager;
