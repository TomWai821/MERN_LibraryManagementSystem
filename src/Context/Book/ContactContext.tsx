import { createContext, FC, useCallback, useContext, useEffect, useState } from "react";
import { CreateContact, DeleteContact, EditContact, GetContact } from "../../Controller/BookController/ContactController";
import { ChildProps, ContactProps, ContactState } from "../../Model/ContextAndProviderModel";
import { ContactInterface, GetResultInterface } from "../../Model/ResultModel";
import { GetData } from "../../Controller/OtherController";

const ContactContext = createContext<ContactProps | undefined>(undefined);

export const ContactProvider:FC<ChildProps> = ({children}) => 
{
    const [contact, setContact] = useState<ContactState>({ Author:[], Publisher:[]});
    const authToken = GetData("authToken") as string;

    const fetchAllContactData = useCallback(async () => 
    {
        const getAuthorData: GetResultInterface | undefined = await GetContact("Author", undefined, undefined);
        const getPublisherData : GetResultInterface | undefined = await GetContact("Publisher", undefined, undefined);

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

    const fetchContactDataWithFilterData = useCallback(async (type:string, author:string, publisher:string) => 
    {
        const getData: GetResultInterface | undefined = await GetContact(type, author, publisher);

        if(getData && Array.isArray(getData.foundContact as ContactInterface[]))
        {
            switch(type)
            {
                case "Author":
                    setContact((prev) => ({...prev, Author:getData.foundContact as ContactInterface[]}));
                    break;

                case "Publisher":
                    setContact((prev) => ({...prev, Publisher:getData.foundContact as ContactInterface[]}));
                    break;
            }
        }
    }
    ,[])

    const createContactData = useCallback(async (type:string, contactName:string, phoneNumber:string, email:string, address?:string) => 
    {
        const createContactData = await CreateContact(authToken, type, contactName, phoneNumber, email, address);

        if(createContactData)
        {
            fetchAllContactData();
        }
    }
    ,[fetchAllContactData])

    const editContactData = useCallback( async (type:string, id:string, contactName:string, phoneNumber:string, email:string, address?:string) => 
    {
        const editContactData = await EditContact(authToken, type, contactName, phoneNumber, email, address, id);

        if(editContactData)
        {
            fetchAllContactData();
        }
    }
    ,[fetchAllContactData])

    const deleteContactData = useCallback(async (type:string, id:string) => 
    {
        const deleteContactData = await DeleteContact(authToken, type, id);

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
        <ContactContext.Provider value={{ contact, fetchAllContactData, fetchContactDataWithFilterData, createContactData, editContactData, deleteContactData}}>
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
