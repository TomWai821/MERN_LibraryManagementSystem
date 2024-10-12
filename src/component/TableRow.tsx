import { FC } from 'react'
import { TextField } from "@mui/material"

interface TableRowProps
{
    firstName:string;
    firstLabel:string;
    firstType: string;
    secondName:string;
    secondLabel:string;
    secondType: string;
    disabled: boolean;
}  

const TableRow: FC<TableRowProps> = ({firstName, firstLabel, firstType, secondName, secondLabel, secondType, disabled}) => 
{
    return(
    <tr>
        <td>
            <label htmlFor={firstName} id="card-label">{firstLabel}:</label>
        </td>

        <td>
            <TextField name={firstName} type={firstType} size="small" disabled={disabled}/>
        </td>
        
        <td>
            <label htmlFor={secondName} id="card-label">{secondLabel}:</label>
        </td>

        <td>
            <TextField name={secondName} type={secondType}  size="small" disabled={disabled}/>
        </td>
    </tr>
    )
}

export default TableRow