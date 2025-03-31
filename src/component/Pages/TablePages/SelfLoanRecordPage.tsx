import { ChangeEvent, FC, useCallback, useState } from "react"
import { Box, Paper,  TableContainer } from "@mui/material"
import { PageItemToCenter } from "../../../ArraysAndObjects/FormatSyntaxObjects"
import TableTitle from "../../UIFragment/TableTitle";
import { PagesInterface } from "../../../Model/TablePagesAndModalModel";
import CustomTab from "../../UIFragment/CustomTab";
import { LoanBookTabLabel, PaginationOption } from "../../../ArraysAndObjects/TableArrays";
import SelfBookRecordTabPanel from "./Tabs/SelfBookRecordTabPanel";
import { useSuggestBookContext } from "../../../Context/Book/SuggestBookContext";
import RecordFilter from "./Filter/RecordFilter";

const SelfLoanRecordPage:FC<PagesInterface> = (pageData) => 
{
    const { isAdmin } = pageData;
    const { SelfLoanBook } = useSuggestBookContext();
    const { fetchSelfLoanBookWithFliterData } = useSuggestBookContext();

    const [tabValue, setTabValue] = useState(0);
    const [paginationValue, setPaginationValue] = useState(10);
    const [searchData, setSearchData] = useState({bookname: "", status: "All"});
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
        fetchSelfLoanBookWithFliterData(searchData.bookname, searchData.status);
    }

    const onChange = (event:ChangeEvent<HTMLInputElement>) => 
    {
        const {name, value} = event.target;
        setSearchData({...searchData, [name]: value})
    }

    return(
        <Box sx={{ ...PageItemToCenter, flexDirection: 'column', padding: '0 50px'}}>
            <TableTitle title={SetTitle[tabValue]} dataLength={SelfLoanBook.length}/>

            <RecordFilter value={tabValue} onChange={onChange} searchData={searchData} Search={search}  isAdmin={isAdmin}/>

            <CustomTab isAdmin={isAdmin} value={tabValue} valueChange={changeValue} paginationValue={paginationValue} tabLabel={LoanBookTabLabel} paginationOption={PaginationOption}/>

            <TableContainer sx={{ marginTop: 5 }} component={Paper}>
               <SelfBookRecordTabPanel value={tabValue} bookData={SelfLoanBook} paginationValue={paginationValue} isAdmin={isAdmin}/>
            </TableContainer>
        </Box>
    )
}

export default SelfLoanRecordPage