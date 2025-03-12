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

const DefinitionPage:FC<PagesInterface>  = (loginData) => 
{
    const {isAdmin} = loginData;
    const {defination} = useDefinationContext();
    const {handleOpen} = useModal();

    useEffect(() => 
    {
        if(!isAdmin)
        {
            ChangePage('/');
        }
    },[isAdmin])

    const openEditLanguageModel = (data: any) => 
    {
        handleOpen(<EditLanguageDataModal value={0} editData={data} compareData={data}/>);
    }

    return(
        <Box sx={{ ...PageItemToCenter, flexDirection: 'column', padding: '0 50px'}}>
            <Typography sx={{fontSize: '24px'}}>Manage Defination</Typography>

            <Box sx={{ paddingTop: '50px', minHeight: '100px' }}>
                <Typography sx={{fontSize: '24px'}}>Genre {defination.Genre.length === 0 ? "(Do not have any genre data currently)" : null}</Typography>
                {   defination.Genre.map((genreData, index) => 
                    (
                        <Chip key={index} label={genreData.genre +"(" + genreData.shortName +")"} variant="outlined" onClick={() => openEditLanguageModel(genreData)}/>
                    ))
                }
            </Box>

            <Box sx={{ paddingTop: '50px', minHeight: '100px' }}>
                <Typography sx={{fontSize: '24px'}}>Language {defination.Language.length === 0 ? "(Do not have any language data currently)" : null}</Typography>
                {   defination.Language.map((languageData, index) => 
                    (
                        <Chip key={index} label={languageData.language +"(" + languageData.shortName +")"} variant="outlined" onClick={() =>  openEditLanguageModel(languageData)}/>
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