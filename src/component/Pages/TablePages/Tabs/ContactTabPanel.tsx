import { FC, Fragment } from "react"

// UI Fragment
import CustomTabPanel from "../../../UIFragment/CustomTabPanel"

// 
import AuthorTable from "../Tables/Contact/AuthorTable"
import PublisherTable from "../Tables/Contact/PublisherTable"

// Model
import {ContactTableInterface } from "../../../../Model/BookTableModel"

const ContactTabPanel:FC<ContactTableInterface> = (TabData) =>
{
    const {value, isAdmin, contactData, paginationValue} = TabData;
    
    return(
        <Fragment>
            <CustomTabPanel index={0} value={value as number}>
                <AuthorTable value={value} contactData={contactData} paginationValue={paginationValue} isAdmin={isAdmin}/>
            </CustomTabPanel>

            <CustomTabPanel index={1} value={value as number}>
                <PublisherTable value={value} contactData={contactData} paginationValue={paginationValue} isAdmin={isAdmin}/>
            </CustomTabPanel>
        </Fragment>
    )
}

export default ContactTabPanel