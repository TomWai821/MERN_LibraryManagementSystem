import { Box, MenuItem, Tab, Tabs, TextField, Typography } from "@mui/material";
import { ChangeEvent, FC } from "react";
import { TabInterface } from "../../../Model/TablePageModel";

const getTabProps = (index: number) => 
{
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    }
}

const CustomTab:FC<TabInterface> = (TabData) => 
{

    const {tabLabel, isAdmin, value, paginationValue, valueChange, paginationOption} = TabData;

    const handleTabChange = (event: ChangeEvent<{}>, newValue: number) => 
    {
        valueChange("Tab", newValue);
    }

    const handlePaginationChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => 
    {
        const selectedValue = parseInt(event.target.value);
        valueChange("Pagination", selectedValue);
    }

    if(!isAdmin)
    {
        return null;
    }

    return(
        isAdmin && (
            <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                <Tabs value={value} onChange={handleTabChange}>
                    {tabLabel.map((tab, index) => 
                        (
                            <Tab key={index} label={tab.label} {...getTabProps(index)}/>
                        ))
                    }
                </Tabs>

                <Box sx={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                    <Typography sx={{marginRight: '10px'}}>Show Rows</Typography>
                    <TextField size="small" value={paginationValue} onChange={handlePaginationChange} select>
                        {
                            paginationOption.map((option, index) => 
                                (
                                    <MenuItem key={index} value={option}>{option}</MenuItem>
                                )
                            )
                        }
                    </TextField>
                </Box>
            </Box>
        )
    );
}

export default CustomTab