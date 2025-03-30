import { FC } from "react"
import { DisplayDataModalBody } from "../../../../Model/ModelForModal"
import { Avatar, Box, Typography } from "@mui/material";
import { BookImageFormat, displayAsRow} from "../../../../ArraysAndObjects/FormatSyntaxObjects";
import { LoanBookInterface } from "../../../../Model/ResultModel";
import { TransferDateToISOString } from "../../../../Controller/OtherController";

const LoanBookDataBody:FC<DisplayDataModalBody> = (AllUserData) => 
{
    const {data} = AllUserData;
    const LoanData = data as LoanBookInterface;

    const bookData = () => 
    {
        const defaults = { imageUrl: "", bookname: "", username: "", loanDate: "", dueDate: "", status: ""};
    
        const BookData = 
        {
            imageUrl: LoanData.bookDetails?.image?.url,
            bookname: LoanData.bookDetails?.bookname,
            username: LoanData.userDetails?.username,
            loanDate: TransferDateToISOString(LoanData.loanDate as Date),
            dueDate: TransferDateToISOString(LoanData.dueDate as Date),
            status: LoanData.status
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
                <Typography>Username: {bookData().username}</Typography>
                <Typography>Loan Date: {bookData().loanDate}</Typography>
                <Typography>Due Date: {bookData().dueDate}</Typography>
                <Typography>Status: {bookData().status}</Typography>
            </Box>
        </Box>
    );
}

export default LoanBookDataBody