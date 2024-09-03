import User from '../schema/user';

export const findUser = async (email:Record<string, any>) => 
{
    try
    { 
        return await User.findOne({email});
    }
    catch(error)
    {
        return error;
    } 
}

export const createUser = async (user: Record<string, any>) => 
{ 
    try
    {
        return await User.create(user);
    }
    catch(error)
    {
        return error;
    }
};
