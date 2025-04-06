import { FC } from "react"
import { Box, TextField, Button } from "@mui/material";
import { ContactFilterInterface } from "../../../../Model/TablePagesAndModalModel"

import { ItemToCenter } from "../../../../ArraysAndObjects/FormatSyntaxObjects";

import CreateContextModal from "../../../Modal/Contact/CreateContactModal";
import { useModal } from "../../../../Context/ModalContext";

const RecordFilter:FC<ContactFilterInterface> = (filterData) => 
{
    const {value, searchData, onChange, Search} = filterData;
    const { handleOpen } = useModal();

    const dataForTextField = 
    [
        {label: "Author", name: "author", value: searchData.author},
        {label: "Publisher", name: "publisher", value: searchData.publisher}
    ]

    const openCreateContactDataModal = () => 
    {
        handleOpen(<CreateContextModal value={value}/>);
    };

    return(
        <Box sx={{ padding: '25px 15%' }}>
            <Box sx={{ ...ItemToCenter, paddingBottom: '25px', alignItems: 'center' }}>
               
                <TextField label={dataForTextField[value].label} name={dataForTextField[value].name} value={dataForTextField[value].value} 
                    onChange={onChange} size="small" sx={{ width: '80%', paddingRight: '10px' }}/>
                
                <Button variant='contained' sx={{marginLeft: '10px'}} onClick={Search}>Search</Button>
                <Button variant='contained' sx={{marginLeft: '10px'}} onClick={openCreateContactDataModal}>Create</Button>
            </Box>
        </Box>
    );
}

export default RecordFilter
