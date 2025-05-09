import { FC, Fragment } from "react"

// UI Fragment
import CustomTabPanel from "../../../UIFragment/CustomTabPanel"

// Model
import { BookRecordTableInterface } from "../../../../Model/BookTableModel"
import SelfLoanBookTable from "../Tables/Book/SelfLoanBookTable";
import FavouriteBookTable from "../Tables/Book/FavouriteBookTable";

const SelfRecordTabPanel:FC<BookRecordTableInterface> = (TabData) =>
{
    const {value, bookData, paginationValue} = TabData;
    
    return(
        <Fragment>
            <CustomTabPanel index={0} value={value}>
                <SelfLoanBookTable value={value} bookData={bookData} paginationValue={paginationValue}/>
            </CustomTabPanel>

            <CustomTabPanel index={1} value={value}>
                <FavouriteBookTable value={value} bookData={bookData} paginationValue={paginationValue}/>
            </CustomTabPanel>
        </Fragment>
    )
}

export default SelfRecordTabPanel