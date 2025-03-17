import { FC } from 'react'
import { Box, Chip, IconButton, Tooltip, Typography } from "@mui/material"
import AddIcon from '@mui/icons-material/Add';

//  Context
import { useModal } from "../../../../../Context/ModalContext";

// Modals
import CreateDefinationModal from "../../../../Modal/Defination/CreateDefinationModal";
import EditGenreDataModal from "../../../../Modal/Defination/EditGenreDataModal";
import EditLanguageDataModal from "../../../../Modal/Defination/EditLanguageDataModal";
import DeleteDefinationConfirmModal from "../../../../Modal/Confirmation/Defination/DeleteDefinationdataConfirmModal";
import TableTitle from '../../../../UIFragment/TableTitle';

const GenreChipTable:FC<{type:string, value:number, data:any, dataLength:number}> = (ChipTableData) => 
{
    const {type, data, value, dataLength} = ChipTableData;

    const {handleOpen} = useModal();

    const openCreateModal = (value: number) => 
    {
        handleOpen(<CreateDefinationModal value={value} />);
    }

    const openEditModal = (type: string, data: any) => 
    {
        switch(type)
        {
            case "Genre":
                handleOpen(<EditGenreDataModal value={0} editData={data} compareData={data}/>);
                break;

            case "Language":
                handleOpen(<EditLanguageDataModal value={1} editData={data} compareData={data}/>);
                break;
        }

    }

    const handleDelete = (value:number, data:any) =>
    {
        /*
            handleOpen(<DeleteDefinationConfirmModal _id={data._id} type={type} data={data}/>);
        */
    }

    return(
        <Box sx={{ paddingTop: '50px', minHeight: '100px' }}>
            <TableTitle type={type} dataLength={dataLength}/>
            {   
                /*
                data.map((genreData, index) => 
                (
                    <Chip sx={{marginRight: '10px'}} key={index} label={`${genreData.genre} (${genreData.shortName})`} variant="outlined" 
                        onClick={() => openEditModal("Genre", genreData)}onDelete={() => handleDelete(value, genreData)}/>
                ))
                */
            }
            <Tooltip title={"Create Genre Defination Data"}>
                <IconButton onClick={() => openCreateModal(value)}>
                    <AddIcon/>
                </IconButton>
            </Tooltip>
        </Box>
    )
}

export default GenreChipTable