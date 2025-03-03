export const printError = async (error:any) => 
{
    if (error instanceof Error) 
    {
        throw new Error(error.message);
    } 
    else 
    {
        throw new Error('An unknown error occurred');
    }
}