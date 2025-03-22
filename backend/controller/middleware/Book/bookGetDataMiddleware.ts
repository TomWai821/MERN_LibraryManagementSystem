import { NextFunction, Response } from "express";
import { AuthRequest } from "../../../model/requestInterface";
import { BookInterface } from "../../../model/bookSchemaInterface";
import {  GetBook } from "../../../schema/book/book";

// for build query (GET method in user, which require login)
export const BuildBookQueryAndGetData = async (req: AuthRequest, res: Response, next: NextFunction) => 
{
    const tableName = req.params.tableName;
    const queryParams = req.query;
    let foundBook: BookInterface | BookInterface[] | null | undefined;

    const hasBodyParameter = Object.keys(queryParams).length > 0;

    if (hasBodyParameter && tableName) 
    {
        foundBook = await fetchBookData(queryParams); 
    } 
    else 
    {
        foundBook = await GetBook();
    }

    if (!foundBook) 
    {
        return res.status(400).json({success: false, message:"Could not found user"});
    }

    req.foundBook = foundBook;
    next();
};

const fetchBookData = async (queryParams: any) => 
{
    const query = buildQuery(queryParams);
    return await GetBook(query) as BookInterface[];
};

const buildQuery = (queryParams: any) => 
{
    const { bookname, genreID, languageID } = queryParams;

    console.log(genreID);
    const query =  {
        ...(bookname && { "bookname": { $regex: bookname, $options: "i" } }),
        ...(genreID && { "genreID":  genreID }),
        ...(languageID && { "languageID": languageID }),
    };

    console.log(query);
    return query;
};