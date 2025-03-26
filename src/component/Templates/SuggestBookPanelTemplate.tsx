import { Avatar, Box, Typography } from "@mui/material"
import { FC, Fragment } from "react"
import { BookDataInterface, LoanBookInterface } from "../../Model/ResultModel"
import { TransferDateToISOString } from "../../Controller/OtherController";
import { Margin } from "@mui/icons-material";

const SuggestBookPanelTemplate:FC<{title:string, data:BookDataInterface[] | LoanBookInterface[]}> = (suggestBookPanelData) => 
{
    const {title, data} = suggestBookPanelData;

    const PublishPanelSyntax = 
    {
        padding: '25px', display: 'grid', justifyContent: 'center', 
        alignItems: 'center', gap: '15px 50px', gridTemplateColumns: 'repeat(8, 10%)', 
        backgroundColor: 'lightgray', borderRadius: '10px'
    }

    const ImageSyntax = { width: "175px", height: "250px" }

    const PanelOnHoverSyntax = {cursor: 'pointer', backgroundColor: 'white', opacity: '50%', borderRadius: '5px'}

    const PanelSyntax = {display: 'grid',textAlign: 'center', justifyContent: 'center', width: "220px", height: "320px"}

    const isBookDataInterface = (book:any): book is BookDataInterface => 
    {
        return 'image' in book && 'bookname' in book;
    }
    
    return(
        <Box sx={{padding: '20px 0'}}>
            <Typography sx={{fontSize: '24px', paddingBottom: '10px'}}>{title}</Typography>
            <Box sx={PublishPanelSyntax}>
                {
                    data.map((book, index) => 
                    (
                        <Box key={index} sx={{ ...PanelSyntax, "&:hover": PanelOnHoverSyntax}}>
                            {
                                isBookDataInterface(book) ? 
                                (
                                    <Fragment>
                                        <Avatar src={book.image?.url} alt="Preview" variant="rounded"sx={ImageSyntax} />
                                        <Typography sx={{width: "175px"}}>{book.bookname}</Typography>
                                        <Typography>{`(${TransferDateToISOString(book.publishDate as Date)})`}</Typography>
                                    </Fragment>
                                ) 
                                : 
                                (
                                    <Fragment>
                                        <Avatar src={book.bookDetails?.image?.url} alt="Preview" variant="rounded" sx={ImageSyntax}/>
                                        <Typography sx={{width: "175px"}}>{book.bookDetails?.bookname}</Typography>
                                        <Typography>{`(${book.count} Loans)`}</Typography>
                                    </Fragment>
                                )
                            }
                        </Box>
                    ))
                }
            </Box>
        </Box>
    )
}

export default SuggestBookPanelTemplate