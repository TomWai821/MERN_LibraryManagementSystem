import { FC, Fragment } from "react"

// UI Fragment
import CustomTabPanel from "../../../UIFragment/CustomTabPanel"

// Another Component
import BookRecordTable from "../Tables/BookRecordTable"

// Model
import { BookRecordTableInterface } from "../../../../Model/BookTableModel"


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