import SearchOptionField from "../../../../UIFragment/Card/SearchOptionField";
import { BookSearchField, AllUserSearchField, OtherUserSearchField } from "../../../../../Maps/TextFieldsMaps";
import { FC } from "react";
import { OptionFieldsInterface } from "../../../../../Model/TablePageModel";


const OptionFields:FC<OptionFieldsInterface> = (searchOptionFieldData) => 
{
    const {value, type, optionVisiable, onChange, searchData} = searchOptionFieldData;

    const Book = 
    [
        <SearchOptionField optionVisiable={optionVisiable} onChange={onChange} SearchField={BookSearchField} searchData={searchData} />
    ]

    const User = 
    [
        <SearchOptionField optionVisiable={optionVisiable} onChange={onChange} SearchField={AllUserSearchField} searchData={searchData} />,
        <SearchOptionField optionVisiable={optionVisiable} onChange={onChange} SearchField={OtherUserSearchField} searchData={searchData} />,
        <SearchOptionField optionVisiable={optionVisiable} onChange={onChange} SearchField={OtherUserSearchField} searchData={searchData} />
    ]

    switch(type)
    {
        case "Book":
            return Book[value];
        
        case "User":
            return User[value];
        
        default:
            return null;
    }
}

export default OptionFields;
