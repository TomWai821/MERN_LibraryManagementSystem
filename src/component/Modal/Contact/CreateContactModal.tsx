import { ChangeEvent, FC, useState } from "react"
import ModalTemplate from "../../Templates/ModalTemplate"
import { CreateModalInterface } from "../../../Model/ModelForModal"
import { useModal } from "../../../Context/ModalContext";
import CreateContactConfirmModal from "../Confirmation/Contact/CreateContactConfirmModal";
import { Box, TextField } from "@mui/material";
import { ModalBodySyntax } from "../../../ArraysAndObjects/FormatSyntaxObjects";
import ModalConfirmButton from "../../UIFragment/ModalConfirmButton";

const CreateContextModal:FC<CreateModalInterface> = (createModalData) => 
{
    const { value, data } = createModalData;
    const { handleOpen } = useModal()

    const [contact, setContact] = useState({author: data?.author ?? "", publisher: data?.publisher ?? "", phoneNumber: data?.phoneNumber ?? "", email: data?.email ?? "", address: data?.address ?? ""});
    const type = value === 0 ? "Author" : "Publisher";

    const onChange = (event: ChangeEvent<HTMLInputElement>) => 
    {
        const {name, value} = event.target;
        setContact({...contact, [name]: value})
    }

    const OpenConfirmModal = () => 
    {
       handleOpen(<CreateContactConfirmModal value={value} data={contact}/>);
    }

    return(
        <ModalTemplate title={`Create ${type}`} width="400px" cancelButtonName={"Exit"}>
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
            
            <ModalConfirmButton clickEvent={OpenConfirmModal} name={"Create"} buttonType={""}/>
        </ModalTemplate>
    )
}

export default CreateContextModal