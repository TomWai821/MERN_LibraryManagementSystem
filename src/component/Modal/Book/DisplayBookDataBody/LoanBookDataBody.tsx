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

    const imageUrl = LoanData.bookDetails?.image?.url;

    const BookData: Record<string,{label:string, data:any}> = 
    {
        "bookname": {label: "Bookname", data:LoanData.bookDetails?.bookname},
        "username": {label: "Username", data:LoanData.userDetails?.username},
        "loanDate": {label: "Loan Date", data:TransferDateToISOString(LoanData.loanDate as Date)},
        "dueDate": {label: "Due Date", data:TransferDateToISOString(LoanData.dueDate as Date)},
        "status": {label: "Status", data:LoanData.status}
    };

    return(
        <Box sx={{...displayAsRow, justifyContent: 'space-between'}}>
            <Avatar src={imageUrl} alt="Preview" variant="rounded" sx={BookImageFormat}/>
            
            <Box sx={{ display: 'grid', gap: '20px 50px', width:'350px', gridTemplateColumns: '100%'}}>
                {
                    Object.entries(BookData).map(([key, data], index) => 
                        (
                            <Typography>{data.label}: {data.data}</Typography>
                        )
                    )
                }
            </Box>
        </Box>
    );
}

export default LoanBookDataBody