import { FC, useEffect } from "react";
import { Box, Chip, IconButton, Tooltip, Typography } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';

// Context
import { useDefinationContext } from "../../../Context/Book/DefinationContext";
import { useModal } from "../../../Context/ModalContext";

// Modaks
import CreateDefinationModal from "../../Modal/Defination/CreateDefinationModal";
import EditGenreDataModal from "../../Modal/Defination/EditGenreDataModal";
import EditLanguageDataModal from "../../Modal/Defination/EditLanguageDataModal";
import DeleteDefinationConfirmModal from "../../Modal/Confirmation/Defination/DeleteDefinationdataConfirmModal";

// Useful function
import { ChangePage } from "../../../Controller/OtherController";

// data (CSS Syntax)
import { PageItemToCenter } from "../../../ArraysAndObjects/FormatSyntaxObjects";

//Model
import { PagesInterface } from "../../../Model/TablePagesAndModalModel";
import TableTitle from "../../UIFragment/TableTitle";

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
            <TableTitle title={"Genre"} dataLength={defination.Genre.length}/>
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
                <TableTitle title={"Language"} dataLength={defination.Language.length}/>
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