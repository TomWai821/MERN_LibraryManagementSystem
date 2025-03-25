import { FC, useEffect } from "react";
import { Box, Chip, IconButton, Tooltip, Typography } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';

// Context
import { useDefinitionContext } from "../../../Context/Book/DefinitionContext";
import { useModal } from "../../../Context/ModalContext";

// Modals
import CreateDefinitionModal from "../../Modal/Definition/CreateDefinitionModal";
import EditGenreDataModal from "../../Modal/Definition/EditGenreDataModal";
import EditLanguageDataModal from "../../Modal/Definition/EditLanguageDataModal";
import DeleteDefinitionConfirmModal from "../../Modal/Confirmation/Definition/DeleteDefinitionConfirmModal";

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
    const {definition} = useDefinitionContext();
    const {handleOpen} = useModal();

    const openCreateModal = (value: number) => 
    {
        handleOpen(<CreateDefinitionModal value={value} />);
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

    const handleDelete = (type:string, data:any) =>
    {
        handleOpen(<DeleteDefinitionConfirmModal _id={data._id} type={type} data={data}/>);
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
            <Typography sx={{fontSize: '24px'}}>Manage Definition</Typography>

            <Box sx={{ paddingTop: '50px', minHeight: '100px' }}>
            <TableTitle title={"Genre"} dataLength={definition.Genre.length}/>
                {   definition.Genre.map((genreData, index) => 
                    (
                        <Chip sx={{marginRight: '10px'}} key={index} label={`${genreData.genre} (${genreData.shortName})`} variant="outlined" 
                            onClick={() => openEditModel("Genre", genreData)}onDelete={() => handleDelete("Genre", genreData)}/>
                    ))
                }
                <Tooltip title={"Create Genre Definition Data"}>
                    <IconButton onClick={() => openCreateModal(0)}>
                        <AddIcon/>
                    </IconButton>
                </Tooltip>
            </Box>

            <Box sx={{ paddingTop: '50px', minHeight: '100px' }}>
                <TableTitle title={"Language"} dataLength={definition.Language.length}/>
                {   definition.Language.map((languageData, index) => 
                    (
                        <Chip sx={{marginRight: '10px'}} key={index} label={`${languageData.language} (${languageData.shortName})`} variant="outlined" 
                            onClick={() => openEditModel("Language", languageData)} onDelete={() => handleDelete("Language", languageData)}/>
                    ))
                }
                <Tooltip title={"Create Language Definition Data"}>
                    <IconButton onClick={() => openCreateModal(1)}>
                        <AddIcon/>
                    </IconButton>
                </Tooltip>
            </Box>
        </Box>
    );
}

export default DefinitionPage