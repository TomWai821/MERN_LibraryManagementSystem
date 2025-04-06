import { Box, MenuItem, Tab, Tabs, TextField, Typography } from "@mui/material";
import { ChangeEvent, FC, Fragment } from "react";

import { TabInterface } from "../../Model/TablePagesAndModalModel";

import { displayAsRow } from "../../ArraysAndObjects/FormatSyntaxObjects";

const getTabProps = (index: number) => 
{
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    }
}

const CustomTab:FC<TabInterface> = (TabData) => 
{

    const {tabLabel, isAdmin, isLoggedIn, type, value, paginationValue, valueChange, paginationOption} = TabData;

    const handleTabChange = (event: ChangeEvent<{}>, newValue: number) => 
    {
        valueChange("Tab", newValue);
    }

    const handlePaginationChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => 
    {
        const selectedValue = parseInt(event.target.value);
        valueChange("Pagination", selectedValue);
    }

    const condition = () =>
    {
        return isAdmin || (isLoggedIn && type === "Record");
    }

    return(
        <Fragment>
            <Box sx={{ ...displayAsRow, width: '100%', alignItems: 'center', justifyContent: 'space-between' }}>
                { condition() && (
                    <Tabs value={value} onChange={handleTabChange}>
                        {tabLabel.map((tab, index) => 
                            (
                                <Tab key={index} label={tab.label} {...getTabProps(index)}/>
                            ))
                        }
                    </Tabs>
                )}

                <Box sx={{...displayAsRow, alignItems: 'center', marginLeft: 'auto'}}>
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
        </Fragment>
    );
}

export default CustomTab