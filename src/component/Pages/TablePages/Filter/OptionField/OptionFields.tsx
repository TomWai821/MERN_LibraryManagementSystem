import SearchOptionField from "../../../../UIFragment/Card/SearchOptionField";
import { BookSearchField } from "../../../../../Maps/TextFieldsMaps";
import { ChangeEvent, FC } from "react";


const OptionFields:FC<{value: number, type:string, optionVisiable:boolean, onChange:(event: ChangeEvent<HTMLInputElement>) => void, searchData:any}> = ({value, type, optionVisiable, onChange, searchData}) => 
{
    const Book = 
    [
        <SearchOptionField optionVisiable={optionVisiable} onChange={onChange} SearchField={BookSearchField} searchData={searchData}/>
    ]

    switch(type)
    {
        case "Book":
            return Book[value];
        
        default:
            return null;
    }
}

export default OptionFields;
