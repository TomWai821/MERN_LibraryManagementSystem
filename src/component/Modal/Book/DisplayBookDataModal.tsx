import { FC } from "react";
import { Box } from "@mui/material";

import ModalTemplate from "../../Templates/ModalTemplate";

import { DisplayDataModalInterface } from "../../../Model/ModelForModal";

import { ModalBodySyntax } from '../../../ArraysAndObjects/FormatSyntaxObjects';
import AllBookDataBody from "./DisplayBookDataBody/AllBookDataBody";
import LoanBookDataBody from "./DisplayBookDataBody/LoanBookDataBody";

const DisplayBookDataModal:FC<DisplayDataModalInterface> = (displayUserData) => 
{
    const {value, data, isLoggedIn} = displayUserData;
    const width = '600px';

    const setTitle = () => 
    {
        let displayData = {title:"", displayBody:<></>}
        switch(value)
        {
            case 0:
                displayData.title = "Book Information";
                displayData.displayBody = <AllBookDataBody data={data} isLoggedIn={isLoggedIn}/>
                break;

            case 1:
                displayData.title = "OnLoan Book Information";
                displayData.displayBody = <LoanBookDataBody data={data} isLoggedIn={isLoggedIn}/>
                break;

        }
        return displayData;
    }

    return(
        <ModalTemplate title={setTitle().title as string} width={width} cancelButtonName={"Exit"} >
            <Box id="modal-description" sx={ModalBodySyntax}>
                {setTitle().displayBody}
            </Box>
        </ModalTemplate>
    );
}

export default DisplayBookDataModal;