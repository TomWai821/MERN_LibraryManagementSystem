import { FC } from "react"
import { DisplayDataModalBody } from "../../../../Model/ModelForModal"
import { Avatar, Box, Typography } from "@mui/material";
import { BookDescriptionDisplayFormat, BookImageFormat, displayAsRow} from "../../../../ArraysAndObjects/FormatSyntaxObjects";
import { BookDataInterface } from "../../../../Model/ResultModel";

const AllBookDataBody:FC<DisplayDataModalBody> = (AllUserData) => 
{
    const {data} = AllUserData;
    const Data = data as BookDataInterface;

    return(
        <Box sx={{...displayAsRow, justifyContent: 'space-between'}}>
            <Avatar src={Data.imageUrl} alt="Preview" variant="rounded" sx={BookImageFormat}/>
            
            <Box sx={{ display: 'grid', gap: '20px 50px', gridTemplateColumns: '100%'}}>
                <Typography>Bookname: {Data.bookname}</Typography>
                <Typography>Genre: {Data.genreDetails.genre}</Typography>
                <Typography>Language: {Data.languageDetails.language}</Typography>
                <Typography>Status: {Data.status}</Typography>
                <Typography>Author: {Data.authorDetails.author}</Typography>
                <Typography>Publisher: {Data.publisherDetails.publisher}</Typography>
                <Box sx={{ maxWidth: '350px', display: 'inline-block'}}>
                    <Typography>Description:</Typography>
                    <Typography sx={BookDescriptionDisplayFormat}>{Data.description}</Typography>
                </Box>
            </Box>
        </Box>
    );
}

export default AllBookDataBody