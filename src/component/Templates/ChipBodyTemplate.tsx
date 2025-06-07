import { Box, Chip, IconButton, Tooltip } from "@mui/material"
import { BookDescriptionDisplayFormat } from "../../ArraysAndObjects/Style"
import AddIcon from '@mui/icons-material/Add';
import { FC } from "react";
import { ChipBodyInterface } from "../../Model/UserTableModel";

// Modals
import CreateDefinitionModal from "../Modal/Definition/CreateDefinitionModal";
import EditDefinitionDataModal from "../Modal/Definition/EditDefinitionModal";
import DeleteDefinitionConfirmModal from "../Modal/Confirmation/Definition/DeleteDefinitionConfirmModal";

import { useModal } from "../../Context/ModalContext";

const ChipBody:FC<ChipBodyInterface> = (chipBodyData) => 
{
    const {value, title, data} = chipBodyData;
    const {handleOpen} = useModal();

    const OpenModal = (type: string, value?: number, data?: any, deleteType?: string ) => 
    {
        const ModalMap:Record<string, JSX.Element> = 
        {
            "Create": <CreateDefinitionModal value={value} />,
            "Edit": <EditDefinitionDataModal value={value as number} editData={data} compareData={data}/>,
            "Delete": <DeleteDefinitionConfirmModal _id={data._id} type={deleteType} data={data}/>
        }

        if(!ModalMap[type])
        {
            console.log(`Invalid type: ${type}!`);
            return;
        }

        handleOpen(ModalMap[type]);
    }

    return(
        <Box sx={{ ...BookDescriptionDisplayFormat, minHeight: '100px' }}>
            {   
             data.map((Data, index) => 
                (
                    <Chip sx={{marginRight: '10px'}} key={index} label={`${value === 0 ? Data.genre : Data.language} (${Data.shortName})`} variant="outlined" 
                        onClick={() => OpenModal("Edit", value, Data)} onDelete={() => OpenModal("Delete", undefined, Data, title)}/>
                ))
            }
            <Tooltip title={`Create ${title} Definition Data`}>
                <IconButton onClick={() => OpenModal("Create", value)}>
                    <AddIcon/>
                </IconButton>
            </Tooltip>
        </Box>
    )
}

export default ChipBody