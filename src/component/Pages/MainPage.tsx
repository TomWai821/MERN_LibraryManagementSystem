import { Box } from "@mui/material";
import { PageItemToCenter } from "../../ArraysAndObjects/FormatSyntaxObjects";
import SuggestBookPanelTemplate from "../Templates/SuggestBookPanelTemplate";
import { FC } from "react";
import { PagesInterface } from "../../Model/TablePagesAndModalModel";
import { useBookContext } from "../../Context/Book/BookContext";

const MainPage:FC<PagesInterface> = (pageData) =>
{
    const {isLoggedIn, isAdmin} = pageData;
    const { suggestBook } = useBookContext();
    
    const titles = ["Recommand For You","New Publish", "Most Popular"]
    
    return(
        <Box sx={{ ...PageItemToCenter, flexDirection: 'column', padding: '0 25px'}}>
            {
                titles.map((title, index) => 
                    (
                        <SuggestBookPanelTemplate key={index} value={index} title={title} data={suggestBook[index]} IsLoggedIn={isLoggedIn} isAdmin={isAdmin as boolean}/>
                    )
                )
            }
        </Box>
    );
}

export default MainPage