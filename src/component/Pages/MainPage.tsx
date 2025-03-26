import { Box } from "@mui/material";
import { PageItemToCenter } from "../../ArraysAndObjects/FormatSyntaxObjects";
import { useSuggestBookContext } from "../../Context/Book/SuggestBookContext";
import SuggestBookPanelTemplate from "../Templates/SuggestBookPanelTemplate";

const MainPage = () =>
{
    const { suggestBook } = useSuggestBookContext();
    const titles = ["New Publish", "Most Popular"]
    
    return(
        <Box sx={{ ...PageItemToCenter, flexDirection: 'column', padding: '0 25px'}}>
            {
                titles.map((title, index) => 
                    (
                        <SuggestBookPanelTemplate key={index} title={title} data={suggestBook[index]}/>
                    )
                )
            }
        </Box>
    );
}

export default MainPage