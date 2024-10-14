import { TableRowProps } from "../Interface/propsInterface";
import { FC } from 'react'
import { TextField } from "@mui/material"

const TableRow: FC<TableRowProps> = ({firstName, firstLabel, firstType, firstValue, secondName, secondLabel, secondType, secondValue, onChange, disabled}) => 
{
    return(
    <tr>
        <td>
            <label htmlFor={firstName} id="card-label">{firstLabel}:</label>
        </td>

        <td>
            <TextField name={firstName} type={firstType} value={firstValue} size="small" onChange={onChange} disabled={disabled}/>
        </td>
        
        <td>
            <label htmlFor={secondName} id="card-label">{secondLabel}:</label>
        </td>

        <td>
            <TextField name={secondName} type={secondType} value={secondValue} size="small" onChange={onChange} disabled={disabled}/>
        </td>
    </tr>
    )
}

export default TableRow