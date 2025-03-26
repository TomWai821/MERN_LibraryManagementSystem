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
        const defaults = { imageUrl: "", bookname: "", genre: "", status: "",language: "",author: "", publisher: "", publishDate: "", description: ""};
    
        const getValue = (primary: any, secondary: any, transform?: (value: any) => any) =>
            transform ? transform(primary || secondary) : primary || secondary || "";
    
        const BookData = 
        {
            imageUrl: getValue(Data.image?.url, LoanData.bookDetails?.image?.url),
            bookname: getValue(Data.bookname, LoanData.bookDetails?.bookname),
            genre: getValue(Data.genreDetails?.genre, LoanData.genreDetails?.genre),
            status: getValue(Data.status, LoanData.bookDetails?.status),
            language: getValue(Data.languageDetails?.language, LoanData.languageDetails?.language),
            author: getValue(Data.authorDetails?.author, LoanData.authorDetails?.author),
            publisher: getValue(Data.publisherDetails?.publisher, LoanData.publisherDetails?.publisher),
            publishDate: getValue(Data.publishDate, LoanData.bookDetails?.publishDate, TransferDateToISOString),
            description: getValue(Data.description, LoanData.bookDetails?.description),
        };
    
        return { ...defaults, ...BookData };
    };

    return(
        <Box sx={{...displayAsRow, justifyContent: 'space-between'}}>
            <Avatar src={bookData().imageUrl} alt="Preview" variant="rounded" sx={BookImageFormat}/>
            
            <Box sx={{ display: 'grid', gap: '20px 50px', width:'350px', gridTemplateColumns: '100%'}}>
                <Typography>Bookname: {bookData().bookname}</Typography>
                <Typography>Genre: {bookData().genre}</Typography>
                <Typography>Language: {bookData().language}</Typography>
                {isLoggedIn && <Typography>Status: {bookData().status}</Typography>}
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