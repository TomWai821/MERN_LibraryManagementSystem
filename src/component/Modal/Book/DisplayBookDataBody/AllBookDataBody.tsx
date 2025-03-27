import { FC } from "react"
import { DisplayDataModalBody } from "../../../../Model/ModelForModal"
import { Avatar, Box, Typography } from "@mui/material";
import { BookDescriptionDisplayFormat, BookImageFormat, displayAsRow} from "../../../../ArraysAndObjects/FormatSyntaxObjects";
import { BookDataInterface, LoanBookInterface } from "../../../../Model/ResultModel";
import { TransferDateToISOString } from "../../../../Controller/OtherController";

const AllBookDataBody:FC<DisplayDataModalBody> = (AllUserData) => 
{
    const {data, isLoggedIn} = AllUserData;
    const Data = data as BookDataInterface;
    const LoanData = data as LoanBookInterface;

    const bookData = () => 
    {
        const defaults = { imageUrl: "", bookname: "", genre: "", status: "", language: "",author: "", publisher: "", publishDate: "", description: ""};
    
        const BookData =
        {
            imageUrl: Data.image?.url || LoanData.bookDetails?.image?.url,
            bookname: Data.bookname || LoanData.bookDetails?.bookname,
            genre: Data.genreDetails?.genre || LoanData.genreDetails?.genre,
            status: Data.status || LoanData.bookDetails?.status,
            language: Data.languageDetails?.language || LoanData.languageDetails?.language,
            author: Data.authorDetails?.author || LoanData.authorDetails?.author,
            publisher: Data.publisherDetails?.publisher || LoanData.publisherDetails?.publisher,
            publishDate: Data.publishDate ? TransferDateToISOString(Data.publishDate as Date) : TransferDateToISOString(LoanData.bookDetails?.publishDate as string),
            description: Data.description || LoanData.bookDetails?.description
        };
    
        return { ...defaults, ...BookData };
    };

    return(
        <Box sx={{...displayAsRow, justifyContent: 'space-between'}}>
            <Avatar src={bookData().imageUrl} alt="Preview" variant="rounded" sx={BookImageFormat}/>
            
            <Box sx={{ display: 'grid', gap: '20px 50px', width:'350px', gridTemplateColumns: '100%'}}>
                <Box sx={{display: 'inline-block'}}>
                    <Typography>Bookname:</Typography>
                    <Typography>{bookData().bookname}</Typography>
                </Box>
                {isLoggedIn && <Typography>Status: {bookData().status}</Typography>}
                <Typography>Genre: {bookData().genre}</Typography>
                <Typography>Language: {bookData().language}</Typography>
                <Typography>Author: {bookData().author}</Typography>
                <Typography>Publisher: {bookData().publisher}</Typography>
                <Typography>Publish Date: {bookData().publishDate}</Typography>
                <Box sx={{ maxWidth: '350px', display: 'inline-block'}}>
                    <Typography>Description:</Typography>
                    <Typography sx={BookDescriptionDisplayFormat}>{bookData().description}</Typography>
                </Box>
            </Box>
        </Box>
    );
}

export default AllBookDataBody