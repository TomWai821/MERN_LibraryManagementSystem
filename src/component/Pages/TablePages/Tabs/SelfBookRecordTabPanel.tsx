import { FC, Fragment } from "react"

// UI Fragment
import CustomTabPanel from "../../../UIFragment/CustomTabPanel"

// Model
import { BookRecordTableInterface } from "../../../../Model/BookTableModel"
import SelfLoanBookTable from "../Tables/Book/SelfLoanBookTable";

const SelfBookRecordTabPanel:FC<BookRecordTableInterface> = (TabData) =>
{
    const {value, isAdmin, bookData, paginationValue, isLoggedIn} = TabData;
    
    return(
        <Fragment>
            <CustomTabPanel index={0} value={value}>
                <SelfLoanBookTable value={value} bookData={bookData} paginationValue={paginationValue} isAdmin={isAdmin} isLoggedIn={isLoggedIn}/>
            </CustomTabPanel>

            <CustomTabPanel index={1} value={value}>
                <></>
            </CustomTabPanel>
        </Fragment>
    )
}

export default SelfBookRecordTabPanel