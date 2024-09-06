import User from '../schema/user';

export const findUser = async (email:Record<string, any>) => 
{
    try
    { 
        return User.findOne(email);
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
        return User.create(user);
    }
    catch(error)
    {
        return error;
    }
};

export const getUser = async(userId:string) => 
{
    try
    {
        return User.findById(userId).select("-password");
    }
    catch(error)
    {
        return error;
    }
}

export const changePasword = async()
{
    return User.findByIdAndUpdate();
}
