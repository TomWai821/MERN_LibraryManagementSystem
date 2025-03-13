import { createContext, FC, useCallback, useContext, useEffect,  useState } from "react";
import { CreateDefinationData, DeleteDefinationData, EditDefinationData, GetDefination } from "../../Controller/BookController/DefinationController";
import { ChildProps, DefinatonProps } from "../../Model/ContextAndProviderModel";
import { DefinationInterface, DefinationResultInterface, DefinationState } from "../../Model/ResultModel";

const DefinationContext = createContext<DefinatonProps | undefined>(undefined);

export const DefinationProvider:FC<ChildProps> = ({children}) => 
{
    const [defination, setDefination] = useState<DefinationState>(
        {
            Genre:[],
            Language:[]
        }
    );

    const fetchAllDefination = useCallback(async () => 
    {
        const getGenreData: DefinationResultInterface | undefined = await GetDefination("Genre");
        const getLanguageData : DefinationResultInterface | undefined = await GetDefination("Language");

        if(getGenreData && Array.isArray(getGenreData.foundData))
        {
            setDefination((prev) => ({...prev, Genre:getGenreData.foundData as DefinationInterface[]}));
        }

        if(getLanguageData && Array.isArray(getLanguageData.foundData))
        {
            setDefination((prev) => ({...prev, Language:getLanguageData.foundData as DefinationInterface[]}));
        }
    }
    ,[])

    const createDefination = useCallback(async (type:string, shortName:string, detailsName:string) => 
    {
        const createDefinationData = await CreateDefinationData(type, shortName, detailsName);

        if(createDefinationData)
        {
            fetchAllDefination();
        }
    }
    ,[fetchAllDefination])

    const editDefination = useCallback( async (type:string, id:string, shortName:string, detailsName:string) => 
    {
        const editDefinationData = await EditDefinationData(type, id, shortName, detailsName);

        if(editDefinationData)
        {
            fetchAllDefination();
        }
    }
    ,[fetchAllDefination])

    const deleteDefination = useCallback(async (type:string, id:string) => 
    {
        const deleteDefinationData = await DeleteDefinationData(type, id);

        if(deleteDefinationData)
        {
            fetchAllDefination();
        }
    }
    ,[fetchAllDefination])

    useEffect(() => 
    {
        fetchAllDefination();
    }
    ,[fetchAllDefination])

    return (
        <DefinationContext.Provider value={{ defination, fetchAllDefination, createDefination, editDefination, deleteDefination}}>
            {children}
        </DefinationContext.Provider>
    );
}

export const useDefinationContext = () => 
{
    const context = useContext(DefinationContext);
    
    if (context === undefined) 
    {
        throw new Error("useUserContext must be used within a UserProvider");
    }
    return context;
};
