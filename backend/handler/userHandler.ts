import { UserMethod, DataType } from '../enum/enum'

import User from '../schema/user';

export const UserUtils = async (method:string, data: string | Record<string, any>) => 
{
    try
    { 
        switch(method)
        {
            case UserMethod.FIND:
                if (typeof data === 'string') 
                {
                    throw new Error("Invalid data type for findOne");
                }
                return await User.findOne(data);
            
            case UserMethod.CREATE:
                return await User.create(data);
            
            case UserMethod.GET: 
                if(JSON.stringify(data) === '{}')
                {
                    return await User.find({});
                }
                return await User.findById(data).select("-createdAt -password");       

            default:
                return null;
        }
    }
    catch(error)
    {
        return error;
    } 
}

export const changeData = async(dataType:string, userId:string, newData:string) =>
{
    switch(dataType)
    {
        case DataType.PASSWORD:
            return User.findByIdAndUpdate(userId, {dataType:newData});
        
        case DataType.NAME:
            return User.findByIdAndUpdate(userId, {name:newData});
        
        default:
            return null;
    }
}