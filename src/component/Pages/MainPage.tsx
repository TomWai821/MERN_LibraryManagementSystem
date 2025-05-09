import { Box } from "@mui/material";
import { PageItemToCenter } from "../../ArraysAndObjects/FormatSyntaxObjects";
import SuggestBookPanelTemplate from "../Templates/SuggestBookPanelTemplate";
import { useBookContext } from "../../Context/Book/BookContext";

const MainPage = () =>
{
    const { suggestBook } = useBookContext();
    
    const titles = ["Recommand For You","New Publish", "Most Popular"]
    
    return(
        <Box sx={{ ...PageItemToCenter, flexDirection: 'column', padding: '0 25px'}}>
            {
                titles.map((title, index) => 
                    (
                        <SuggestBookPanelTemplate key={index} value={index} title={title} data={suggestBook[index]}/>
                    )
                )
            }
        </Box>
    );
}

export default MainPage