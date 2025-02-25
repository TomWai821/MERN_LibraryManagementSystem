import SearchOptionField from "../../../../UIFragment/Card/SearchOptionField";
import { BookSearchField } from "../../../../../Maps/TextFieldsMaps";
import { FC } from "react";
import { OptionFieldsInterface } from "../../../../../Model/TablePageModel";


const OptionFields:FC<OptionFieldsInterface> = (searchOptionFieldData) => 
{
    const {value, type, optionVisiable, onChange, searchData} = searchOptionFieldData;

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
