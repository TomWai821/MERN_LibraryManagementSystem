import { FC, useCallback, useState } from "react"
import { Box, Paper,  TableContainer } from "@mui/material"
import { PageItemToCenter } from "../../../ArraysAndObjects/FormatSyntaxObjects"
import TableTitle from "../../UIFragment/TableTitle";
import { PagesInterface } from "../../../Model/TablePagesAndModalModel";
import CustomTab from "../../UIFragment/CustomTab";
import { LoanBookTabLabel, PaginationOption } from "../../../ArraysAndObjects/TableArrays";
import SelfBookRecordTabPanel from "./Tabs/SelfBookRecordTabPanel";
import { useSuggestBookContext } from "../../../Context/Book/SuggestBookContext";

const SelfLoanRecordPage:FC<PagesInterface> = (pageData) => 
{
    const { isAdmin } = pageData;
    const { SelfLoanBook } = useSuggestBookContext();

    const [tabValue, setTabValue] = useState(0);
    const [paginationValue, setPaginationValue] = useState(10);
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

    return(
        <Box sx={{ ...PageItemToCenter, flexDirection: 'column', padding: '0 50px'}}>
            <TableTitle title={SetTitle[tabValue]} dataLength={SelfLoanBook.length}/>

            <CustomTab isAdmin={isAdmin} value={tabValue} valueChange={changeValue} paginationValue={paginationValue} tabLabel={LoanBookTabLabel} paginationOption={PaginationOption}/>

            <TableContainer sx={{ marginTop: 5 }} component={Paper}>
               <SelfBookRecordTabPanel value={tabValue} bookData={SelfLoanBook} paginationValue={paginationValue} isAdmin={isAdmin}/>
            </TableContainer>
        </Box>
    )
}

export default SelfLoanRecordPage