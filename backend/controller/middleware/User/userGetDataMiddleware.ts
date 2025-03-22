import { NextFunction, Response } from "express";
import { UserInterface } from "../../../model/userSchemaInterface";
import { FindUserByID, FindUserWithData, GetUser } from "../../../schema/user/user";
import { AuthRequest } from "../../../model/requestInterface";
import { ObjectId } from "mongoose";

// for build query (GET method in user, which require login)
export const BuildUserQueryAndGetData = async (req: AuthRequest, res: Response, next: NextFunction) => 
{
    const userId = req.user?._id;
    const tableName = req.params.tableName;
    const queryParams = req.query;
    let foundUser: UserInterface | UserInterface[] | null | undefined;

    console.log(queryParams);

    if (userId) 
    {
        const hasBodyParameter = Object.keys(queryParams).length > 0;
        foundUser = (!hasBodyParameter && !tableName)? await FindUserByID(userId) : await fetchUserData(tableName, queryParams, userId);
    } 
    else 
    {
        foundUser = await GetUser();
    }

    if (!foundUser) 
    {
        return res.status(400).json({success: false, message:"Could not found user"});
    }

    req.foundUser = foundUser;
    next();
};

const fetchUserData = async (tableName: string, queryParams: any, userId?: ObjectId) => 
{
    const query = buildQuery(queryParams);
    return await FindUserWithData(tableName, query, userId);
};

const buildQuery = (queryParams: any) => 
{
    const { username, email, status, role, gender } = queryParams;

    return {
        ...(username && { "username": { $regex: username, $options: "i" } }),
        ...(email && { "email": { $regex: email, $options: "i" } }),
        ...(status && { status }),
        ...(role && { role }),
        ...(gender && { gender })
    };
};