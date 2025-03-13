import { FC, useEffect } from "react";
import { Box, Chip, IconButton, Tooltip, Typography } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';

// Another useful function
import { ChangePage } from "../../Controller/OtherController";

// Context
import { useModal } from "../../Context/ModalContext";
import { useDefinationContext } from "../../Context/Book/DefinationContext";

// Model
import { PagesInterface } from "../../Model/TablePagesAndModalModel";

// Data (CSS Syntax)
import { PageItemToCenter } from "../../Maps/FormatSyntaxMaps";
import EditLanguageDataModal from "../Modal/Defination/EditLanguageDataModal";
import DeleteDefinationConfirmModal from "../Modal/Confirmation/Defination/DeleteDefinationdataConfirmModal";
import CreateDefinationModal from "../Modal/Defination/CreateDefinationModal";
import EditGenreDataModal from "../Modal/Defination/EditGenreDataModal";

const DefinitionPage:FC<PagesInterface>  = (loginData) => 
{
    const {isAdmin} = loginData;
    const {defination} = useDefinationContext();
    const {handleOpen} = useModal();

    const openCreateModal = (value: number) => 
    {
        handleOpen(<CreateDefinationModal value={value} />);
    }

    const openEditModel = (type: string, data: any) => 
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
        handleOpen(<DeleteDefinationConfirmModal _id={data._id} value={value} data={data}/>);
    }

    useEffect(() => 
        {
            if(!isAdmin)
            {
                ChangePage('/');
            }
        },[isAdmin])

    return(
        <Box sx={{ ...PageItemToCenter, flexDirection: 'column', padding: '0 50px'}}>
            <Typography sx={{fontSize: '24px'}}>Manage Defination</Typography>

            <Box sx={{ paddingTop: '50px', minHeight: '100px' }}>
                <Typography sx={{fontSize: '24px'}}>Genre {defination.Genre.length === 0 ? "(Do not have any genre data currently)" : null}</Typography>
                {   defination.Genre.map((genreData, index) => 
                    (
                        <Chip sx={{marginRight: '10px'}} key={index} label={`${genreData.genre} (${genreData.shortName})`} variant="outlined" 
                            onClick={() => openEditModel("Genre", genreData)}onDelete={() => handleDelete(0, genreData)}/>
                    ))
                }
                <Tooltip title={"Create Genre Defination Data"}>
                    <IconButton onClick={() => openCreateModal(0)}>
                        <AddIcon/>
                    </IconButton>
                </Tooltip>
            </Box>

            <Box sx={{ paddingTop: '50px', minHeight: '100px' }}>
                <Typography sx={{fontSize: '24px'}}>Language {defination.Language.length === 0 ? "(Do not have any language data currently)" : null}</Typography>
                {   defination.Language.map((languageData, index) => 
                    (
                        <Chip sx={{marginRight: '10px'}} key={index} label={`${languageData.language} (${languageData.shortName})`} variant="outlined" 
                            onClick={() => openEditModel("Language", languageData)} onDelete={() => handleDelete(1, languageData)}/>
                    ))
                }
                <Tooltip title={"Create Language Defination Data"}>
                    <IconButton onClick={() => openCreateModal(1)}>
                        <AddIcon/>
                    </IconButton>
                </Tooltip>
            </Box>
        </Box>
    );
}

export default DefinitionPage