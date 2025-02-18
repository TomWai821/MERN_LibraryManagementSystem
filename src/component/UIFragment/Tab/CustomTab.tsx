import { Tab, Tabs } from "@mui/material";
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
        valueChange(newValue);
    };

    return(
        isAdmin? (
        <Tabs value={value} onChange={handleChange}>
            {tabLabel.map((tab, index) => 
                (
                    <Tab key={index} label={tab.label} {...getTabProps(index)}/>
                ))
            }
        </Tabs>):<></>
    );
}

export default CustomTab