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
    size: "small" | "medium";
    required: boolean;
    requireText: string | null;
    disabled: boolean
}

const InputField: FC<InputFieldProps> = ({name, label, type, value, onChange, size, required, disabled, requireText}) => 
{
    return(
        <div id="card-input">
            <label htmlFor={name} id="card-label">{label}</label>
            <TextField name={name} 
                type={type} 
                value={value} 
                onChange={onChange} 
                size={size} 
                required={required}
                disabled={disabled}
            />
            <span>{requireText}</span>
        </div>
    )
}

export default InputField;