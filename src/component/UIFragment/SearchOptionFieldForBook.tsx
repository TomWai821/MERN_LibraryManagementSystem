import { FC, Fragment } from "react"
import { Box, Card, FormControl, MenuItem, TextField, Typography } from "@mui/material"

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
                        <TextField name="genre" onChange={onChange} value={searchData.genre} size="small" select>
                            {
                                defination.Genre.map((genre, index) => 
                                (
                                    <MenuItem key={index} value={genre.genre}>{`${genre.genre} (${genre.shortName})`}</MenuItem>
                                ))
                            }
                            <MenuItem value="" sx={{ height: '40px'}}/>
                        </TextField>

                        <Typography>Publisher Name</Typography>
                        <TextField name="publisher" onChange={onChange} value={searchData.publisher} size="small"  select></TextField>

                        <Typography>Author Name</Typography>
                        <TextField name="author" onChange={onChange} value={searchData.author} size="small" select></TextField>

                        <Typography>Pages</Typography>
                        <TextField name="pages" onChange={onChange} value={searchData.pages} type="number" size="small" inputProps={{min: 0}}></TextField>
                    </Box>
                </Card>
            )}
        </Fragment>
    )
}

export default SearchOptionFieldForBook