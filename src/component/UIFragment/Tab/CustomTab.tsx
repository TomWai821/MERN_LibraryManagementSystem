import { Box, Tab, Tabs, TextField, Typography } from "@mui/material";
import { ChangeEvent, FC } from "react";
import { TabInterface } from "../../../Model/TablePageModel";

const getTabProps = (index: number) => 
{
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    }
}

const CustomTab:FC<TabInterface> = ({tabLabel, isAdmin, value, valueChange}) => 
{
    const handleChange = (event: ChangeEvent<{}>, newValue: number) => 
    {
        valueChange("Tab", newValue);
    };

    if(!isAdmin)
    {
        return null;
    }

    return(
        isAdmin && (
            <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                <Tabs value={value} onChange={handleChange}>
                    {tabLabel.map((tab, index) => 
                        (
                            <Tab key={index} label={tab.label} {...getTabProps(index)}/>
                        ))
                    }
                </Tabs>

                <Box sx={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                    <Typography sx={{marginRight: '10px'}}>Show Rows</Typography>
                    <TextField size="small" select/>
                </Box>
            </Box>
        )
    );
}

export default CustomTab