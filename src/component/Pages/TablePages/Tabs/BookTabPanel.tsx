import { FC, Fragment } from "react"

// UI Fragment
import CustomTabPanel from "../../../UIFragment/CustomTabPanel"

// 
import LoanBookTable from "../Tables/Book/LoanBookTable"
import AllBookTable from "../Tables/Book/AllBookTable"
import OnShelfBookTable from "../Tables/Book/OnShelfBookTable"

// Model
import { BookRecordTableInterface } from "../../../../Model/BookTableModel"

const BookTabPanel:FC<BookRecordTableInterface> = (TabData) =>
{
    const {value, isAdmin, isLoggedIn, bookData, paginationValue} = TabData;
    
    return(
        <Fragment>
            <CustomTabPanel index={0} value={value}>
                <AllBookTable isAdmin={isAdmin} isLoggedIn={isLoggedIn} bookData={bookData} value={value} paginationValue={paginationValue}/>
            </CustomTabPanel>

            <CustomTabPanel index={1} value={value}>
                <LoanBookTable isAdmin={isAdmin} isLoggedIn={isLoggedIn} bookData={bookData} value={value} paginationValue={paginationValue}/>
            </CustomTabPanel>

            <CustomTabPanel index={2} value={value}>
                <OnShelfBookTable isAdmin={isAdmin} isLoggedIn={isLoggedIn} bookData={bookData} value={value} paginationValue={paginationValue}/>
            </CustomTabPanel>
        </Fragment>
    )
}

export default BookTabPanel