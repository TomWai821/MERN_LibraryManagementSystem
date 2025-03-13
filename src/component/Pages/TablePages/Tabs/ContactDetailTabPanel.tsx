import { FC, Fragment } from "react"

// UI Fragment
import CustomTabPanel from "../../../UIFragment/CustomTabPanel"

// Another Component
import BookRecordTable from "../Tables/BookRecordTable"

// Model
import { BookRecordTableInterface } from "../../../../Model/BookTableModel"

const ContactDetailTabPanel:FC = () =>
{
    
    return(
        <Fragment>
            <CustomTabPanel index={0} value={0}>
                <></>
            </CustomTabPanel>

            <CustomTabPanel index={1} value={1}>
                <></>
            </CustomTabPanel>
        </Fragment>
    )
}

export default ContactDetailTabPanel