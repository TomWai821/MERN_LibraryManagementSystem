import { FC } from "react";
import SearchOptionField from "../UIFragment/Card/SearchOptionField";
import { OptionFieldsInterface } from "../../Model/TablePagesAndModalModel";
import { BookSearchField, AllUserSearchField, OtherUserSearchField } from "../../Maps/TextFieldsMaps";


const OptionFieldsManager:FC<OptionFieldsInterface> = (searchOptionFieldData) => 
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

export default OptionFieldsManager;
