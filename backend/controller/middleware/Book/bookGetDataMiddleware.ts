import { NextFunction, Response } from "express";
import { AuthRequest } from "../../../model/requestInterface";
import { BookInterface } from "../../../model/bookSchemaInterface";
import { GetBook } from "../../../schema/book/book";
import { ObjectId } from "mongodb";

// for build query (GET method in user, which require login)
export const BuildBookQueryAndGetData = async (req: AuthRequest, res: Response, next: NextFunction) => 
{
    const queryParams = req.query;
    let foundBook: BookInterface | BookInterface[] | null | undefined;

    const hasBodyParameter = Object.keys(queryParams).length > 0;

    foundBook = (hasBodyParameter) ? await fetchBookData(queryParams) : foundBook = await GetBook();

    if (!foundBook) 
    {
        return res.status(404).json({success: false, message:"Could not found book"});
    }

    req.foundBook = foundBook;
    next();
};

export const BuildSuggestBookQueryAndGetData = async(req: AuthRequest, res: Response, next: NextFunction) => 
{
    const suggestType = req.params.type;
    const userId = req.user?._id;
    const { topAuthors, topGenres, topPublishers } = req.query;
    let foundBook: BookInterface | BookInterface[] | null | undefined;
    
    switch(suggestType)
    {
        case "newPublish":
            foundBook = await GetBook(undefined, { publishDate: -1 } , 8);
            break;

        case "forUser":
            if(!userId)
            {
                return res.status(400).json({success: false, message:`This suggestion type require authToken!`});
            }
            const query = buildSuggestQuery({ topAuthors, topGenres, topPublishers });
            foundBook = await GetBook(query , { publishDate: -1 }, 8);
            break;

        default:
            return res.status(400).json({success: false, message:`Invalid Suggest Type: ${suggestType}`});
    }

    if (!foundBook) 
    {
        return res.status(404).json({success: false, message:"Could not found suggested book"});
    }

    req.foundBook = foundBook;
    next();
}

const fetchBookData = async (queryParams: any) => 
{
    const query = buildQuery(queryParams);
    return await GetBook(query);
};

const buildQuery = (queryParams: any) => 
{
    const { bookname, genreID, languageID, publisherID, authorID } = queryParams;

    const query = 
    {
        ...(bookname && { "bookname": { $regex: bookname, $options: "i" } }),
        ...(genreID && { "genreID": new ObjectId(genreID) }),
        ...(languageID && { "languageID": new ObjectId(languageID) }),
        ...(publisherID && { "publisherID": new ObjectId(publisherID) }),
        ...(authorID && { "authorID": new ObjectId(authorID) }),
    };

    return query;
};

const buildSuggestQuery = (queryParams: any) => 
{
    const { topAuthors, topGenres, topPublishers } = queryParams;

    const query = 
    {
        status: { $ne: "Loaned" },
        $or: 
        [
            ...(topAuthors ? [{ "authorDetails.author": { $in: topAuthors.split(",") } }] : []),
            ...(topGenres ? [{ "genreDetails.genre": { $in: topGenres.split(",") } }] : []),
            ...(topPublishers ? [{ "publisherDetails.publisher": { $in: topPublishers.split(",") } }] : []),
        ],
    };

    return query;
}