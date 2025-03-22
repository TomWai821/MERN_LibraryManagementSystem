import { ChangeEvent, FC, Fragment } from "react"
import { Box, Card, MenuItem, TextField, Typography } from "@mui/material"

import { BookOptionFieldModal } from "../../Model/InputFieldModel";
import { useDefinationContext } from "../../Context/Book/DefinationContext";

const SearchOptionFieldForBook:FC<BookOptionFieldModal> = ({...optionData}) =>
{
    const {optionVisiable, onChange, searchData} = optionData;
    const {defination} = useDefinationContext();
    
    if (!optionVisiable) 
    {
        return null;
    }

    return(
        <Fragment>
            {optionVisiable && (
                <Card sx={{padding: '15px' }}>
                    <Typography>Options</Typography>
                    <Box sx={{ padding: '15px 20px', display: 'grid', justifyContent: 'center', alignItems: 'center', gap: '15px 50px', gridTemplateColumns: '10% 30% 10% 30%' }}>

                        <Typography>Genre</Typography>
                        <TextField name="genre" value={searchData.genre} size="small" select 
                        onChange=
                        {
                            (event) => 
                            { 
                                const selectedIndex = defination.Genre.findIndex((genre) => genre.genre === event.target.value);
                                onChange(event as ChangeEvent<HTMLInputElement>, selectedIndex as number)
                            }
                        }>
                            {
                                defination.Genre.map((genre, index) => 
                                (
                                    <MenuItem key={index} value={genre.genre}>{`${genre.genre} (${genre.shortName})`}</MenuItem>
                                ))
                            }
                            <MenuItem value="All" sx={{ height: '40px'}}>All</MenuItem>
                        </TextField>

                        <Typography>Language</Typography>
                        <TextField name="language" value={searchData.language} size="small" select 
                        onChange=
                        {
                            (event) => 
                            { 
                                const selectedIndex = defination.Language.findIndex((language) => language.language === event.target.value);
                                onChange(event as ChangeEvent<HTMLInputElement>, selectedIndex as number)
                            }
                        }>
                            {   
                                defination.Language.map((language, index) => 
                                (
                                    <MenuItem key={index} value={language.language}>{`${language.language}(${language.shortName})`}</MenuItem>
                                ))
                            }
                            <MenuItem value="All" sx={{height: '40px'}}>All</MenuItem>
                        </TextField>
                    </Box>
                </Card>
            )}
        </Fragment>
    )
}

export default SearchOptionFieldForBook