import { Box, Card, TextField, Typography } from "@mui/material"
import { FC, Fragment } from "react"
import { OptionFieldModel } from "../../../Model/InputFieldModel"

const SearchOptionField:FC<OptionFieldModel> = ({...optionData}) =>
{
    const {optionVisiable, onChange, SearchField, searchData} = optionData;

    if (!optionVisiable) 
    {
        return null;
    }

    return(
        <Fragment>
         {optionVisiable && (
            <Card sx={{ padding: '15px'}}>
                <Typography>Options</Typography>
                <Box sx={{ padding: '15px 20px', display: 'grid', gap: '15px 50px', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))' }}>
                    {SearchField.map((field, index) => 
                        (
                            <TextField key={index} label={field.label} name={field.name} value={(searchData as any)[field.name]} 
                                type={field.type} size="small" onChange={onChange} select={field.select} slotProps={field.slotProps ?? {}}/>
                        ))
                    }
                </Box>
            </Card>
            )}
        </Fragment>
    )
}

export default SearchOptionField