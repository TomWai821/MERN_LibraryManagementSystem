import { createContext, FC, useCallback, useContext, useEffect, useState } from "react";
import { CreateContact, DeleteContact, EditContact, GetContact } from "../../Controller/BookController/ContactController";
import { ChildProps, ContactProps } from "../../Model/ContextAndProviderModel";
import { ContactInterface, ContactState, GetResultInterface } from "../../Model/ResultModel";
import { GetData } from "../../Controller/OtherController";

const ContactContext = createContext<ContactProps | undefined>(undefined);

export const ContactProvider:FC<ChildProps> = ({children}) => 
{
    const [contact, setContact] = useState<ContactState>(
        {
            Author:[],
            Publisher:[]
        }
    );
    const authToken = GetData("authToken") as string;

    const fetchAllContactData = useCallback(async () => 
    {
        const getAuthorData: GetResultInterface | undefined = await GetContact("Author");
        const getPublisherData : GetResultInterface | undefined = await GetContact("Publisher");

        if(getAuthorData && Array.isArray(getAuthorData.foundContact as ContactInterface[]))
        {
            setContact((prev) => ({...prev, Author:getAuthorData.foundContact as ContactInterface[]}));
        }

        if(getPublisherData && Array.isArray(getPublisherData.foundContact as ContactInterface[]))
        {
            setContact((prev) => ({...prev, Publisher:getPublisherData.foundContact as ContactInterface[]}));
        }
    }
    ,[])

    const createContactData = useCallback(async (type:string, shortName:string, detailsName:string) => 
    {
        const createContactData = await CreateContact(type, authToken, shortName, detailsName);

        if(createContactData)
        {
            fetchAllContactData();
        }
    }
    ,[fetchAllContactData])

    const editContactData = useCallback( async (type:string, id:string, shortName:string, detailsName:string) => 
    {
        console.log(id);
        const editContactData = await EditContact(type, authToken, id, shortName, detailsName);

        if(editContactData)
        {
            fetchAllContactData();
        }
    }
    ,[fetchAllContactData])

    const deleteContactData = useCallback(async (type:string, id:string) => 
    {
        const deleteContactData = await DeleteContact(type, authToken, id);

        if(deleteContactData)
        {
            fetchAllContactData();
        }
    }
    ,[fetchAllContactData])

    useEffect(() => 
    {
        fetchAllContactData();
    }
    ,[fetchAllContactData])

    return (
        <ContactContext.Provider value={{ contact, fetchAllContactData, createContactData, editContactData, deleteContactData}}>
            {children}
        </ContactContext.Provider>
    );
}

export const useContactContext = () => 
{
    const context = useContext(ContactContext);
    
    if (context === undefined) 
    {
        throw new Error("useUserContext must be used within a UserProvider");
    }
    return context;
};
