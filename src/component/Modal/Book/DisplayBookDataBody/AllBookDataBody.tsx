import { FC } from "react"
import { UserModalBody } from "../../../../Model/ModelForModal"
import { Box, Typography } from "@mui/material";
import { displayAsColumn} from "../../../../Maps/FormatSyntaxMaps";
import { BookResultDataInterface } from "../../../../Model/ResultModel";

const AllBookDataBody:FC<UserModalBody> = (AllUserData) => 
{
    const {data} = AllUserData;
    const Data = data as BookResultDataInterface;

    return(
        <Box sx={{...displayAsColumn, alignItems:'center', justifyContent: 'center'}}>
            <Box sx={{ display: 'grid', gap: '20px 50px', gridTemplateColumns: '100%'}}>
                <Typography>Bookname: {Data.bookname}</Typography>
                <Typography>Genre: {Data.genreDetails.genre}</Typography>
                <Typography>Language: {Data.languageDetails.language}</Typography>
                <Typography>Pages: {Data.pages}</Typography>
                <Typography>Description:{Data.description}</Typography>
            </Box>
        </Box>
    );
}

export default AllBookDataBody