import { FC } from "react";
import { Button } from "@mui/material";
import { DeleteButton } from "../../Maps/FormatSyntaxMaps";

import { ModalConfirmButtonInterface } from "../../Model/ModelForModal";

const ModalConfirmButton:FC<ModalConfirmButtonInterface> = (modalConfirmButtonData) => 
{

    const {clickEvent, name, buttonType} = modalConfirmButtonData;

    const syntaxDetection = (buttonType:string) =>
    {
        switch(buttonType)
        {
            case "Important":
                return {...DeleteButton, marginRight: '10px'};

            default:
                return {marginRight: '10px'};
        }
    }

    return(
        <Button variant='contained' sx={syntaxDetection(buttonType)} onClick={clickEvent}>{name}</Button>
    );
}

export default ModalConfirmButton;