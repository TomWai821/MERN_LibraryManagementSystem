import { FC } from "react";
import { Box } from "@mui/material";

import ModalTemplate from "../../Templates/ModalTemplate";

import { DisplayDataModalInterface } from "../../../Model/ModelForModal";

import { ModalBodySyntax } from '../../../ArraysAndObjects/FormatSyntaxObjects';
import AuthorDataBody from "./DisplayContactDataBody/AuthorDataBody";
import PublisherDataBody from "./DisplayContactDataBody/PublisherDataBody";
import { ContactInterface } from "../../../Model/ResultModel";

const DisplayContactDataModal:FC<DisplayDataModalInterface> = (displayUserData) => 
{
    const {value, data} = displayUserData;
    const width = '500px';

    const setTitle = () => 
    {
        let displayData = {title:"", displayBody:<></>}
        switch(value)
        {
            case 0:
                displayData.title = "Author Information";
                displayData.displayBody = <AuthorDataBody data={data as ContactInterface}/>;
                break;

            case 1:
                displayData.title = "Publisher Information";
                displayData.displayBody = <PublisherDataBody data={data as ContactInterface}/>;
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

export default DisplayContactDataModal;