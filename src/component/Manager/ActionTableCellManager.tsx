import { FC } from "react";

import { ActionTableCellInterface } from "../../Model/TablePagesAndModalModel";
import ActionTableCellForUser from "../Pages/TablePages/Tables/TableCell/ActionTableCellForUser";
import ActionTableCellForAdmin from "../Pages/TablePages/Tables/TableCell/ActionTableCellForAdmin";

const ActionTableCellManager: FC<ActionTableCellInterface> = (tableCellData) => 
{
    const { value, TableName, Information, isAdmin, changeValue, setSearchBook, searchBook } = tableCellData;

    return (
        isAdmin ? 
            <ActionTableCellForAdmin value={value} TableName={TableName} Information={Information} isAdmin={isAdmin} 
                changeValue={changeValue} setSearchBook={setSearchBook} searchBook={searchBook}/> 
            : 
            <ActionTableCellForUser Information={Information}/>
    );
}

export default ActionTableCellManager;
