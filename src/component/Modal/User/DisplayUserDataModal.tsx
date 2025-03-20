import { FC } from "react";
import { Box } from "@mui/material";

import ModalTemplate from "../../Templates/ModalTemplate";

import { DisplayDataModalInterface } from "../../../Model/ModelForModal";

import { ModalBodySyntax } from "../../../Maps/FormatSyntaxMaps";
import AllUserDataBody from "./DisplayUserDataBody/AllUserDataBody";
import BannedUserDataBody from "./DisplayUserDataBody/BannedUserDataBody";
import DeleteUserDataBody from "./DisplayUserDataBody/DeleteUserDataBody";
import { UserResultDataInterface } from "../../../Model/ResultModel";


const DisplayUserDataModal:FC<DisplayDataModalInterface> = (displayUserData) => 
{
    const {value, data, isAdmin} = displayUserData;

    const setTitle = () => 
    {
        let displayData = {title:"", displayBody:<></>}
        switch(value)
        {
            case 0:
                displayData.title = "User Information";
                displayData.displayBody = <AllUserDataBody data={data as UserResultDataInterface}/>;
                break;

            case 1:
                displayData.title = "Suspend User Information";
                displayData.displayBody = <BannedUserDataBody data={data as UserResultDataInterface} isAdmin={isAdmin}/>;
                break;

            case 2:
                displayData.title = "Delete User Information";
                displayData.displayBody = <DeleteUserDataBody data={data as UserResultDataInterface}/>;
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

export default DisplayUserDataModal;