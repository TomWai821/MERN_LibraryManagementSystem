import { Fragment } from "react/jsx-runtime"
import { FC } from "react"
import BookRecordTable from "../Tables/BookRecordTable"
import CustomTabPanel from "../../../UIFragment/TabPanel/CustomTabPanel"
import { BookRecordTableInterface } from "../../../../Model/TablePageModel"

const BookTabPanel:FC<BookRecordTableInterface> = ({value, isAdmin, isLoggedIn, bookData}) =>
{
    return(
        <Fragment>
            <CustomTabPanel index={0} value={value}>
                <BookRecordTable isAdmin={isAdmin} isLoggedIn={isLoggedIn} bookData={bookData} value={value}/>
            </CustomTabPanel>
        </Fragment>
    )
}

export default BookTabPanel