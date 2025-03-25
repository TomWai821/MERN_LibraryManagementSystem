import { NextFunction, Response } from "express";
import { AuthRequest } from "../../../model/requestInterface";
import { BookInterface } from "../../../model/bookSchemaInterface";
import { GetBook } from "../../../schema/book/book";
import { ObjectId } from "mongodb";

// for build query (GET method in user, which require login)
export const BuildBookQueryAndGetData = async (req: AuthRequest, res: Response, next: NextFunction) => 
{
    const tableName = req.params.tableName;
    const queryParams = req.query;
    let foundBook: BookInterface | BookInterface[] | null | undefined;

    const hasBodyParameter = Object.keys(queryParams).length > 0;

    foundBook = (hasBodyParameter && tableName) ? await fetchBookData(queryParams) : foundBook = await GetBook();

    if (!foundBook) 
    {
        return res.status(404).json({success: false, message:"Could not found book"});
    }

    req.foundBook = foundBook;
    next();
};

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