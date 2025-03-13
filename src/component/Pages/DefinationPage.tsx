import { FC, useEffect } from "react";
import { Box, Chip, IconButton, Typography } from "@mui/material";
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

const DefinitionPage:FC<PagesInterface>  = (loginData) => 
{
    const {isAdmin} = loginData;
    const {defination} = useDefinationContext();
    const {handleOpen} = useModal();

    const openEditLanguageModel = (data: any) => 
    {
        handleOpen(<EditLanguageDataModal value={0} editData={data} compareData={data}/>);
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
                        <Chip sx={{marginRight: '10px'}} key={index} label={`${genreData.language}(${genreData.shortName})`} variant="outlined" 
                            onClick={() => openEditLanguageModel(genreData)}onDelete={() => handleDelete(0, genreData)}/>
                    ))
                }
            </Box>

            <Box sx={{ paddingTop: '50px', minHeight: '100px' }}>
                <Typography sx={{fontSize: '24px'}}>Language {defination.Language.length === 0 ? "(Do not have any language data currently)" : null}</Typography>
                {   defination.Language.map((languageData, index) => 
                    (
                        <Chip sx={{marginRight: '10px'}} key={index} label={`${languageData.language}(${languageData.shortName})`} variant="outlined" 
                            onClick={() => openEditLanguageModel(languageData)} onDelete={() => handleDelete(1, languageData)}/>
                    ))
                }
                <IconButton>
                    <AddIcon/>
                </IconButton>
            </Box>
        </Box>
    );
}

export default DefinitionPage