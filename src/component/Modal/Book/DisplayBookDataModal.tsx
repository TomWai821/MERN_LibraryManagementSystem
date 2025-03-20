import { FC } from "react";
import { Box } from "@mui/material";

import ModalTemplate from "../../Templates/ModalTemplate";

import { DisplayDataModalInterface } from "../../../Model/ModelForModal";

import { ModalBodySyntax } from "../../../Maps/FormatSyntaxMaps";
import AllBookDataBody from "./DisplayBookDataBody/AllBookDataBody";
import { BookResultDataInterface } from "../../../Model/ResultModel";

const DisplayBookDataModal:FC<DisplayDataModalInterface> = (displayUserData) => 
{
    const {value, data, isAdmin} = displayUserData;

    const setTitle = () => 
    {
        let displayData = {title:"", displayBody:<></>}
        switch(value)
        {
            case 0:
                displayData.title = "Book Information";
                displayData.displayBody = <AllBookDataBody data={data as BookResultDataInterface}/>
                break;

            case 1:
                displayData.title = "Loaned Book Information";
                break;

            case 2:
                displayData.title = "OnShelf Book Information";
                break;
        }
        return displayData;
    }

    return(
        <ModalTemplate title={setTitle().title as string} cancelButtonName={"Exit"} >
            <Box id="modal-description" sx={ModalBodySyntax}>
                {setTitle().displayBody}
            </Box>
        </ModalTemplate>
    );
}

export default DisplayBookDataModal;