interface ResultInterface
{
    authToken: string;
    name: string;
    role: string;
}

interface GetResultInterface
{
    username: string;
    email: string;
    gender: string;
    role: string;
}

export type {ResultInterface, GetResultInterface}