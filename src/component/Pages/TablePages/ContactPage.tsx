import {  ChangeEvent, FC, useEffect, useState } from "react";
import { Box, TableContainer, Paper } from "@mui/material";

// Another Component
import ContactFilter from "./Filter/ContactFilter";
import CustomTab from "../../UIFragment/CustomTab";
import TableTitle from "../../UIFragment/TableTitle";

// Model
import { PagesInterface } from "../../../Model/TablePagesAndModalModel";

// Data (CSS SYntax and dropdown)
import { PageItemToCenter } from "../../../ArraysAndObjects/FormatSyntaxObjects";
import { ContactTabLabel, PaginationOption } from "../../../ArraysAndObjects/TableArrays";
import { useContactContext } from "../../../Context/Book/ContactContext";
import ContactTabPanel from "./Tabs/ContactTabPanel";
import { ChangePage } from "../../../Controller/OtherController";

const ContactPage:FC<PagesInterface> = (loginData) =>
{
    const { isAdmin, isLoggedIn } = loginData;
    const { contact, fetchContactDataWithFilterData } = useContactContext();
    
    const [searchContact, setSearchContact] = useState({author: "", publisher: ""});
    const [paginationValue, setPaginationValue] = useState(10);
    const [tabValue, setTabValue] = useState(0);

    const Title = ["Manage Author Record", "Manager Publisher Record"];

    const countLength = ()=> 
    {
        switch(tabValue)
        {
            case 0:
                return contact.Author.length;
            
            case 1:
                return contact.Publisher.length;
        }
    }

    const changeValue = (type:string, newValue: number) =>
    {
        switch(type)
        {
            case "Tab":
                setTabValue(newValue);
                break;

            case "Pagination":
                setPaginationValue(newValue);
                break;
            
            default:
                break;
        }
    }

    const onChange = (event: ChangeEvent<HTMLInputElement>) => 
    {
        const {name, value} = event.target;
        setSearchContact({...searchContact, [name]: value});
    }

    const SearchContact = () => 
    {
        const title = ["Author", "Publisher"];
        fetchContactDataWithFilterData(title[tabValue], searchContact.author, searchContact.publisher);
    }

    useEffect(() => 
    {
        if(!isAdmin)
        {
            ChangePage('/');
        }
    },[isAdmin])
    
    return( 
        <Box sx={{ ...PageItemToCenter, flexDirection: 'column', padding: '0 50px'}}>
            <TableTitle title={Title[tabValue]} dataLength={countLength() as number}/>

            <ContactFilter value={tabValue} onChange={onChange} searchData={searchContact} Search={SearchContact}/>

            <CustomTab isAdmin={isAdmin} isLoggedIn={isLoggedIn} value={tabValue} changeValue={changeValue} 
                paginationValue={paginationValue} tabLabel={ContactTabLabel} paginationOption={PaginationOption} type={"Contact"}/>

            <TableContainer sx={{ marginTop: 5 }} component={Paper}>
                <ContactTabPanel value={tabValue} contactData={contact} paginationValue={paginationValue} isAdmin={false}/>
            </TableContainer>
        </Box>
    );
}

export default ContactPage