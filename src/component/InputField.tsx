import { ChangeEvent, FC } from 'react';
import { TextField } from '@mui/material';


// Create a interface to set data type in props
interface InputFieldProps
{
    name: string;
    label: string;
    type: string;
    value: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    requireText: string | null;
}

const InputField: FC<InputFieldProps> = ({name, label, type, value, onChange, requireText}) => 
{
    return(
        <div id="card-input">
            <label htmlFor={name} id="card-label">{label}:</label>
            <TextField name={name} 
                type={type} 
                value={value} 
                onChange={onChange} 
                size="small" 
                required
            />
            <span>{requireText}</span>
        </div>
    )
}

export default InputField;