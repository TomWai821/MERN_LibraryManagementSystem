import { FC, Fragment, useEffect, useState } from "react"
import { Avatar, Box, Tab, Tabs, Typography } from "@mui/material";
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarIcon from '@mui/icons-material/Star';
import Barcode from "react-barcode";

import { DisplayDataModalBody } from "../../../../Model/ModelForModal"

import { BookDescriptionDisplayFormat, BookImageFormat, displayAsRow} from "../../../../ArraysAndObjects/FormatSyntaxObjects";
import { BookDataInterface, GetResultInterface, LoanBookInterface } from "../../../../Model/ResultModel";
import { TransferDateToISOString } from "../../../../Controller/OtherController";

import { BookDataTabLabel } from "../../../../ArraysAndObjects/TableArrays";
import CustomTabPanel from "../../../UIFragment/CustomTabPanel";

const AllBookDataBody:FC<DisplayDataModalBody> = (AllUserData) => 
{
    const {data, isLoggedIn} = AllUserData;
    const Data = data as BookDataInterface;
    const LoanData = data as LoanBookInterface;

    const imageUrl = Data.image?.url || LoanData.bookDetails?.image?.url;
    const descriptionData = Data.description || LoanData.bookDetails?.description;
    const status = Data.status || LoanData.bookDetails?.status;

    const [externalBookData, setExternalBookData] = useState({averageRating:  "N/A (Google)", ratingsCount: "N/A", listPrice: "N/A", ISBN_13_Code: "N/A", ISBN_10_Code: "N/A"});
    const [tabValue, setTabValue] = useState(0);

    const changeTabValue = (event: React.SyntheticEvent, newValue: number) =>
    {
        setTabValue(newValue);
    }

    const a11yProps = (index: number) =>
    {
        return {
          id: `simple-tab-${index}`,
          'aria-controls': `simple-tabpanel-${index}`,
        };
    }

    const getBookDataFromExternal = async () => 
    {
        const apiKey = process.env.REACT_APP_GOOGLE_BOOKS_API_KEY;
        const baseUrl = process.env.REACT_APP_GOOGLE_BOOKS_BASE_URL; 
        const bookName = Data.bookname || LoanData.bookDetails?.bookname;
        const author = Data.authorDetails?.author || LoanData.authorDetails?.author;
        const query = `${bookName} inauthor:${author}`;
        const url = `${baseUrl}?q=${query}&key=${apiKey}`;

        const response = await fetch(url);
        const result = await response.json() as GetResultInterface;

        if (result.items && result.items.length > 0) 
        {
            const book = result.items[0];
            const volumeInfo = book.volumeInfo || {};
            const saleInfo = book.saleInfo || {};
        
            const saleability = saleInfo.saleability;
        
            const externalBookData = 
            {
                averageRating: volumeInfo.averageRating ? `${volumeInfo.averageRating} (Google)` : "N/A (Google)",
                ratingsCount: volumeInfo.ratingsCount ? `${volumeInfo.ratingsCount} (Google)` : "N/A (Google)",
                saleability: saleability || "N/A",
                listPrice: "N/A",
                ISBN_13_Code: volumeInfo.industryIdentifiers?.find(identifier => identifier.type === "ISBN_13")?.identifier as string,
                ISBN_10_Code: volumeInfo.industryIdentifiers?.find(identifier => identifier.type === "ISBN_10")?.identifier as string || "N/A"
            };
        
            if (saleability !== "NOT_FOR_SALE") 
            {
                externalBookData.listPrice = saleInfo.listPrice?.amount ? `${saleInfo.listPrice.currencyCode}$${saleInfo.listPrice.amount}` : "N/A";
            }
        
            setExternalBookData(externalBookData);
        }

        return result;
    }

    const BookData:Record<string, {label:string, value:any}> =
    {
        "bookname": { label: "Bookname", value: Data.bookname || LoanData.bookDetails?.bookname},
        "genre": { label: "Genre", value: Data.genreDetails?.genre || LoanData.genreDetails?.genre },
        "language": { label: "Language", value: Data.languageDetails?.language || LoanData.languageDetails?.language },
        "author": { label: "Author", value: Data.authorDetails?.author || LoanData.authorDetails?.author },
        "publisher": { label: "Publisher", value: Data.publisherDetails?.publisher || LoanData.publisherDetails?.publisher },
        "publishDate": { label: "Publisher Date", value: Data.publishDate ? TransferDateToISOString(Data.publishDate as Date) : TransferDateToISOString(LoanData.bookDetails?.publishDate as string) },     
    };

    const RatingAsNumber = Number.parseInt(externalBookData.averageRating);

    useEffect(() => 
    {
        getBookDataFromExternal();
    },[])
    
    return(
        <Box>
            <Tabs value={tabValue} onChange={changeTabValue} sx={{paddingBottom: '50px', width: '500px'}}>
                {
                    BookDataTabLabel.map((tab, index) => 
                    (
                        <Tab key={index} label={tab.label} {...a11yProps(index)}/>
                    ))
                }
            </Tabs>
            
            <Box sx={{...displayAsRow, justifyContent: 'space-between', width: '500px'}}>
                <Avatar src={imageUrl} alt="Preview" variant="rounded" sx={{...BookImageFormat,paddingTop: '50px'}}/>

                <CustomTabPanel index={tabValue} value={0}>
                    <Box sx={{ display: 'grid', gap: '20px 50px', width:'350px', gridTemplateColumns: '100%'}}>
                        {
                            Object.entries(BookData).map(([key, value], index) => 
                                (
                                    <Typography key={index}>{value.label}: {value.value}</Typography>
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
                </CustomTabPanel>

                <CustomTabPanel index={tabValue} value={1}>
                    <Box sx={{ display: 'grid', gap: '20px 50px', width:'350px', gridTemplateColumns: '100%'}}>
                        <Box sx={displayAsRow}>
                            <Typography>Average Rating:</Typography>
                            {
                                externalBookData.averageRating !== "N/A (Google)" && 
                                Array.from({ length: 5 }).map((_, index) => 
                                (
                                    index < RatingAsNumber ? <StarIcon key={index} sx={{color: 'gold'}}/> : <StarBorderIcon key={index} />
                                ))
                            }
                            <Typography sx={{paddingLeft: '10px'}}>{externalBookData.averageRating}</Typography>
                        </Box>

                        <Typography>Rating Count: {externalBookData.ratingsCount}</Typography>
                        <Typography>List Price: {externalBookData.listPrice}</Typography>

                        <Box sx={{ display: 'grid', gap: '20px', width: '350px', gridTemplateColumns: '100%' }}>
                            <Typography sx={{fontSize: '24px', fontWeight: 'bold'}}>ISBNs:</Typography>
                            {
                                externalBookData.ISBN_13_Code !== "N/A" ?
                                <Fragment>
                                    <Typography>ISBN-13:</Typography>
                                    <Box>
                                        <Barcode value={externalBookData.ISBN_13_Code} width={2} height={60}/>
                                    </Box>
                                </Fragment>
                                :
                                <Typography>ISBN-13: N/A</Typography>
                            }
                            
                            {
                                externalBookData.ISBN_10_Code !== "N/A" ?
                                <Fragment>
                                    <Typography>ISBN-10:</Typography>
                                    <Box>
                                        <Barcode value={externalBookData.ISBN_10_Code} width={2} height={60}/>
                                    </Box>
                                </Fragment>
                                :
                                <Typography>ISBN-10: N/A</Typography>
                            }

                        </Box>
                    </Box>
                </CustomTabPanel>

            </Box>
        </Box>
    );
}

export default AllBookDataBody