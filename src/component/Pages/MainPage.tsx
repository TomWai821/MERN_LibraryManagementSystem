import { Box } from "@mui/material";
import { PageItemToCenter } from "../../ArraysAndObjects/FormatSyntaxObjects";
import { useSuggestBookContext } from "../../Context/Book/SuggestBookContext";
import SuggestBookPanelTemplate from "../Templates/SuggestBookPanelTemplate";
import { FC } from "react";
import { PagesInterface } from "../../Model/TablePagesAndModalModel";

const MainPage:FC<PagesInterface> = (pageData) =>
{
    const {isLoggedIn} = pageData;
    const { suggestBook } = useSuggestBookContext();
    
    const titles = ["New Publish", "Most Popular", "Recommand For You"]
    
    return(
        <Box sx={{ ...PageItemToCenter, flexDirection: 'column', padding: '0 25px'}}>
            {
                titles.map((title, index) => 
                    (
                        <SuggestBookPanelTemplate key={index} value={index} title={title} data={suggestBook[index]} IsLoggedIn={isLoggedIn}/>
                    )
                )
            }
        </Box>
    );
}

export default MainPage