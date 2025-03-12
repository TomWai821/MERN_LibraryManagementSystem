import { FC } from "react";
import SearchOptionField from "../UIFragment/SearchOptionField";
import { OptionFieldsInterface } from "../../Model/TablePagesAndModalModel";
import { AllUserSearchField, OtherUserSearchField } from "../../Maps/TextFieldsMaps";
import { useDefinationContext } from "../../Context/Book/DefinationContext";
import SearchOptionFieldForBook from "../UIFragment/SearchOptionFieldForBook";


const OptionFieldsManager:FC<OptionFieldsInterface> = (searchOptionFieldData) => 
{
    const {value, type, optionVisiable, onChange, searchData} = searchOptionFieldData;

    const Book = 
    [
        <SearchOptionFieldForBook optionVisiable={optionVisiable} onChange={onChange} searchData={searchData}/>,
        <SearchOptionFieldForBook optionVisiable={optionVisiable} onChange={onChange} searchData={searchData}/>,
        <SearchOptionFieldForBook optionVisiable={optionVisiable} onChange={onChange} searchData={searchData} />
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
