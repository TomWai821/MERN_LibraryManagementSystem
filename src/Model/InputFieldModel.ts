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

export interface ViewProfileModel extends SecondRow, FirstRow
{
    email: string;
    gender: string;
};

export interface RegisterModel extends LoginModel
{
    username: string; 
    birthDay: string;
}

export interface LoginModel
{
    email:string,
    password:string
}