import { ChangeEvent, useCallback, useEffect, useState } from "react"
import { Box, Paper,  TableContainer } from "@mui/material"

// UI Fragment and another useful component
import TableTitle from "../../UIFragment/TableTitle";
import CustomTab from "../../UIFragment/CustomTab";
import RecordFilter from "./Filter/RecordFilter";
import SelfRecordTabPanel from "./Tabs/SelfRecordTabPanel";

// Useful function(Controller)
import { ChangePage } from "../../../Controller/OtherController";

// Useful data
import { BookRecordTabLabel, PaginationOption } from "../../../ArraysAndObjects/TableArrays";
import { PageItemToCenter } from "../../../ArraysAndObjects/FormatSyntaxObjects"

// Context
import { useContactContext } from "../../../Context/Book/ContactContext";
import { useDefinitionContext } from "../../../Context/Book/DefinitionContext";
import { useBookContext } from "../../../Context/Book/BookContext";
import { useAuthContext } from "../../../Context/User/AuthContext";

const SelfRecordPage = () => 
{
    const { contact } = useContactContext();
    const { definition } = useDefinitionContext();
    const { IsLoggedIn } = useAuthContext();
    const { BookRecordForUser, fetchLoanBookWithFliterData, fetchBookWithFliterData } = useBookContext();

    const [tabValue, setTabValue] = useState(0);
    const [paginationValue, setPaginationValue] = useState(10);
    const [searchData, setSearchData] = useState({bookname: "", status: "All", author: "All", publisher: "All", genre: "All", language: "All"});
    const SetTitle:string[] = ["Loan Book List", "Favourite Book List"];

    const changeValue = useCallback((type:string, newValue: number) =>
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
    },[])

    const search = () => 
    {
        switch(tabValue)
        {
            case 0:
                fetchLoanBookWithFliterData("Self", searchData.bookname, undefined, searchData.status);
                break;

            case 1:
                const genreID = definition.Genre.find((genre) => genre.genre === searchData.genre)?._id as string;
                const languageID = definition.Language.find((language) => language.language === searchData.language)?._id as string;
                const authorID = contact.Author.find((author) => author.author === searchData.author)?._id as string;
                const publisherID = contact.Publisher.find((publisher) => publisher.publisher === searchData.publisher)?._id as string;
                fetchBookWithFliterData("Favourite", searchData.bookname, searchData.status, genreID, languageID, authorID, publisherID);
                break;
        }
    }

    const onChange = (event:ChangeEvent<HTMLInputElement>) => 
    {
        const {name, value} = event.target;
        setSearchData({...searchData, [name]: value});
    }

    useEffect(() => 
    {
        if(!IsLoggedIn())
        {
            ChangePage('/');
        }
    },[IsLoggedIn])

    return(
        <Box sx={{ ...PageItemToCenter, flexDirection: 'column', padding: '0 50px'}}>
            <TableTitle title={SetTitle[tabValue]} dataLength={BookRecordForUser[tabValue].length}/>

            <RecordFilter value={tabValue} onChange={onChange} searchData={searchData} Search={search}/>

            <CustomTab value={tabValue} changeValue={changeValue} 
                paginationValue={paginationValue} tabLabel={BookRecordTabLabel} paginationOption={PaginationOption} type={"Record"}/>

            <TableContainer sx={{ marginTop: 5 }} component={Paper}>
               <SelfRecordTabPanel value={tabValue} bookData={BookRecordForUser} paginationValue={paginationValue}/>
            </TableContainer>
        </Box>
    )
}

export default SelfRecordPage