import { ChangeEvent, FC, useState } from "react"
import ModalTemplate from "../../Templates/ModalTemplate"
import { EditModalInterface } from "../../../Model/ModelForModal"
import { Box, TextField } from "@mui/material";
import { ModalBodySyntax } from "../../../ArraysAndObjects/FormatSyntaxObjects";
import ModalConfirmButton from "../../UIFragment/ModalConfirmButton";
import { useModal } from "../../../Context/ModalContext";
import EditContactConfirmModal from "../Confirmation/Contact/EditContactConfirmModal";

const EditAuthorModal:FC<EditModalInterface> = (editContactData) => 
{
    const {value, compareData, editData} = editContactData;
    const {handleOpen} = useModal();

    const [contact, setContact] = useState({author: editData?.author ?? "", publisher: editData?.publisher ?? "", phoneNumber: editData?.phoneNumber ?? "", email: editData?.email ?? "", address: editData?.address ?? ""});
    const type = value === 0 ? "Author" : "Publisher";
    const sanitizeField = (field: string) => field.trim() === "" ? "N/A" : field;

    const onChange = (event: ChangeEvent<HTMLInputElement>) => 
    {
        const {name, value} = event.target;
        setContact({...contact, [name] : value})
    }
    
    const OpenConfirmModal = () => 
    {
        const sanitizedContact = value === 0 ? 
        {
            author: contact.author,
            phoneNumber: sanitizeField(contact.phoneNumber),
            email: sanitizeField(contact.email)
        }
        : 
        {
            publisher: contact.publisher,
            phoneNumber: sanitizeField(contact.phoneNumber),
            email: sanitizeField(contact.email),
            address: sanitizeField(contact.address)
        };

        handleOpen(<EditContactConfirmModal value={value as number} editData={sanitizedContact} compareData={compareData} />);
    };

    return(
        <ModalTemplate title={`Edit ${type} Record`} width="400px" cancelButtonName={"Exit"}>
            <Box id="modal-description" sx={ModalBodySyntax}>
            {
                value === 0 ?
                <TextField label="Author" name="author" value={contact.author} type="text" size="small" onChange={onChange}/>
                :
                <TextField label="Publisher" name="publisher" value={contact.publisher} type="text" size="small" onChange={onChange}/>
            }
                <TextField label="Phone Number" name="phoneNumber" value={contact.phoneNumber} type="text" size="small" onChange={onChange}/>

                <TextField label="Email" name="email" value={contact.email} type="text" size="small" onChange={onChange}/>

                { value === 1 && <TextField label="Address" name="address" value={contact.address} type="text" size="small" onChange={onChange}/> }
            </Box>
            
            <ModalConfirmButton clickEvent={OpenConfirmModal} name={"Edit"} buttonType={""}/>
        </ModalTemplate>
    )
}

export default EditAuthorModal