import { FC } from "react";
import { Box } from "@mui/material";

import ModalTemplate from "../../Templates/ModalTemplate";

import { DisplayDataModalInterface } from "../../../Model/ModelForModal";

import { ModalBodySyntax } from '../../../ArraysAndObjects/FormatSyntaxObjects';
import AllBookDataBody from "./DisplayBookDataBody/AllBookDataBody";
import { BookDataInterface } from "../../../Model/ResultModel";

const DisplayBookDataModal:FC<DisplayDataModalInterface> = (displayUserData) => 
{
    const {value, data, isAdmin} = displayUserData;
    const BookData = data as BookDataInterface;

    const setTitle = () => 
    {
        let displayData = {title:"", displayBody:<></>}
        switch(value)
        {
            case 0:
                displayData.title = "Book Information";
                displayData.displayBody = <AllBookDataBody data={data as BookDataInterface}/>
                break;

            case 1:
                displayData.title = "OnLoan Book Information";
                break;

        }
        return displayData;
    }

    const width = BookData.image?.path ? '600px' : '400px';

    return(
        <ModalTemplate title={setTitle().title as string} width={width} cancelButtonName={"Exit"} >
            <Box id="modal-description" sx={ModalBodySyntax}>
                {setTitle().displayBody}
            </Box>
        </ModalTemplate>
    );
}

export default DisplayBookDataModal;