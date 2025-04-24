import { FC, Fragment } from "react"
import { DisplayDataModalBody } from "../../../../Model/ModelForModal"
import { Avatar, Box, Typography } from "@mui/material";
import { BookImageFormat, displayAsRow} from "../../../../ArraysAndObjects/FormatSyntaxObjects";
import { LoanBookInterface } from "../../../../Model/ResultModel";
import { calculateFineAmount, countLateReturn, isExpired, TransferDateToISOString } from "../../../../Controller/OtherController";

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
    };

    return(
        <Box sx={{...displayAsRow, justifyContent: 'space-between'}}>
            <Avatar src={imageUrl} alt="Preview" variant="rounded" sx={BookImageFormat}/>
            
            <Box sx={{ display: 'grid', gap: '20px 50px', width:'350px', gridTemplateColumns: '100%'}}>
                {
                    Object.entries(BookData).map(([key, data], index) => 
                        (
                            <Typography key={index}>{data.label}: {data.data}</Typography>
                        )
                    )
                }

                {
                    <Typography>
                        Status: {LoanData.status}
                        <Typography component="span" sx={{color: 'rgb(230, 0, 0)'}}>
                            { isExpired(LoanData.dueDate as Date) && ` (Overdue by ${countLateReturn(LoanData.dueDate as Date, "number")} Day)`}
                        </Typography>
                    </Typography>
                }

                {
                    isExpired(LoanData.dueDate as Date) && 
                    <Fragment>
                        <Typography>Fines: { isExpired(LoanData.dueDate as Date) && LoanData.finesPaid === "Not Fine Needed" ? "Not Paid" : LoanData.finesPaid} (HKD$ {calculateFineAmount(LoanData.dueDate as string)})</Typography>
                    </Fragment>
                }

                {
                    LoanData.status !== "Loaned" && <Typography>Return Date: {TransferDateToISOString(LoanData.returnDate as Date)}</Typography>
                }
            </Box>
        </Box>
    );
}

export default LoanBookDataBody