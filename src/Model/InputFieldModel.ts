interface FirstRow 
{ 
    username: string; 
    role: string; 
}

interface SecondRow
{
    newName: string; 
    newPassword: string;
}

interface ViewProfileModel extends SecondRow, FirstRow
{
    email: string;
    gender: string;
};

interface LoginModel
{
    email:string,
    password:string
}

interface RegisterModel extends LoginModel
{
    username: string; 
    birthDay: string;
}

export type {ViewProfileModel, LoginModel, RegisterModel}