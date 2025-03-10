import { Box } from "@mui/material";
import { ModalBodySyntax } from "../../../Maps/FormatSyntaxMaps";
import ModalTemplate from "../../Templates/ModalTemplate";

const DisplayDataModal:FC<> = () => 
{
    const setTitle = () => 
    {
        
    }

    return(
        <ModalTemplate title={setTitle() as string} cancelButtonName={"Exit"} >
            <Box id="modal-description" sx={ModalBodySyntax}>
                
            </Box>
        </ModalTemplate>
    );
}