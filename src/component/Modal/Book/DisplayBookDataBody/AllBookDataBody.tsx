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

    const imageUrl = Data.image?.url || LoanData.bookDetails?.image?.url;
    const descriptionData = Data.description || LoanData.bookDetails?.description;
    const status = Data.status || LoanData.bookDetails?.status;

    const BookData:Record<string, {label:string, value:any}> =
    {
        "bookname": { label: "Bookname", value: Data.bookname || LoanData.bookDetails?.bookname},
        "genre": { label: "Genre", value: Data.genreDetails?.genre || LoanData.genreDetails?.genre },
        "language": { label: "Language", value: Data.languageDetails?.language || LoanData.languageDetails?.language },
        "author": { label: "Author", value: Data.authorDetails?.author || LoanData.authorDetails?.author },
        "publisher": { label: "Publisher", value: Data.publisherDetails?.publisher || LoanData.publisherDetails?.publisher },
        "publishDate": { label: "Publisher Date", value: Data.publishDate ? TransferDateToISOString(Data.publishDate as Date) : TransferDateToISOString(LoanData.bookDetails?.publishDate as string) },
    };
    
    return(
        <Box sx={{...displayAsRow, justifyContent: 'space-between'}}>
            <Avatar src={imageUrl} alt="Preview" variant="rounded" sx={BookImageFormat}/>
            
            <Box sx={{ display: 'grid', gap: '20px 50px', width:'350px', gridTemplateColumns: '100%'}}>
                {
                    Object.entries(BookData).map(([key, value], index) => 
                        (
                            <Typography>{value.label}: {value.value}</Typography>
                        )
                    )
                }
                {
                    isLoggedIn &&
                    <Box sx={{ width:'350px', display: 'inline-block'}}>
                        <Typography>Status: {status}</Typography>
                    </Box>
                }

                <Box sx={{ maxWidth: '350px', display: 'inline-block'}}>
                    <Typography>Description:</Typography>
                    <Typography sx={BookDescriptionDisplayFormat}>{descriptionData}</Typography>
                </Box>
            </Box>
        </Box>
    );
}

export default AllBookDataBody