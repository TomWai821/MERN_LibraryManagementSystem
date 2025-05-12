import { Box, Chip, IconButton, Tooltip } from "@mui/material"
import { BookDescriptionDisplayFormat } from "../../ArraysAndObjects/FormatSyntaxObjects"
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

    const openCreateModal = (value: number) => 
    {
        handleOpen(<CreateDefinitionModal value={value} />);
    }

    const openEditModal = (value: number, data: any) => 
    {
        handleOpen(<EditDefinitionDataModal value={value as number} editData={data} compareData={data}/>);
    }

    const handleDelete = (type:string, data:any) =>
    {
        handleOpen(<DeleteDefinitionConfirmModal _id={data._id} type={type} data={data}/>);
    }

    return(
        <Box sx={{ ...BookDescriptionDisplayFormat, minHeight: '100px' }}>
            {   
             data.map((Data, index) => 
                (
                    <Chip sx={{marginRight: '10px'}} key={index} label={`${value === 0 ? Data.genre : Data.language} (${Data.shortName})`} variant="outlined" 
                        onClick={() => openEditModal(value, Data)} onDelete={() => handleDelete(title, Data)}/>
                ))
            }
            <Tooltip title={`Create ${title} Definition Data`}>
                <IconButton onClick={() => openCreateModal(value)}>
                    <AddIcon/>
                </IconButton>
            </Tooltip>
        </Box>
    )
}

export default ChipBody