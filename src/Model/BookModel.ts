import { ReactNode } from "react";

export interface BookInterface
{
    Name: string;
    Genre: string;
    Author: string;
    Publisher: string;
    Pages: number;
}

export interface BookContextProps
{
    setBook: (config: BookInterface | null) => void;
}


export interface BookProviderProps
{
    children: ReactNode;
}