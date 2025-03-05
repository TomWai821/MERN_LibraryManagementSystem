import { NextFunction, Response } from "express";
import { UserInterface } from "../../model/userSchemaInterface";
import { FindUserByID, FindUserWithData, GetUser } from "../../schema/user/user";
import { AuthRequest } from "../../model/requestInterface";
import { ObjectId } from "mongoose";

// for build query (GET method in user, which require login)
export const BuildQueryAndGetData = async (req: AuthRequest, res: Response, next: NextFunction) => 
{
    const userId = req.user?._id;
    const tableName = req.params.tableName;
    const queryParams = req.query;
    let foundUser: UserInterface | UserInterface[] | null | undefined;

    if (userId) 
    {
        const hasBodyParameter = Object.keys(queryParams).length > 0;

        if (!hasBodyParameter && !tableName) 
        {
            foundUser = await validateAndGetUserByID(userId);
        } 
        else 
        {
            foundUser = await fetchUserData(userId, tableName, queryParams);
        }
    } 
    else 
    {
        foundUser = await GetUser();
    }

    req.foundUser = foundUser;
    next();
};

const validateAndGetUserByID = async (userId: ObjectId) => 
{
    const user = await FindUserByID(userId);
    if (!user) 
    {
        throw new Error("Invalid auth Token!");
    }
    return user;
};

const fetchUserData = async (userId: ObjectId, tableName: string, queryParams: any) => 
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