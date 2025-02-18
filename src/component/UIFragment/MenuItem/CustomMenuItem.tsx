import { ListItemIcon, MenuItem, Typography } from "@mui/material"
import { MenuItemSyntax, NavSyntax } from "../../../Maps/FormatSyntaxMaps"
import { FC, Fragment } from "react"
import { MenuItemInterface } from "../../../Model/NavModel";

const CustomMenuItem:FC<MenuItemInterface> = ({pages}) => 
{
    return(
        <Fragment>
        {pages.map((page, index) => (
                <MenuItem key={index} sx={{MenuItemSyntax, NavSyntax}}>
                    <ListItemIcon>{page.icon}</ListItemIcon>
                    <Typography onClick={page.clickEvent} width={'100%'}>{page.name}</Typography>
                </MenuItem>
            ))
        }
        </Fragment>
    );
}

export default CustomMenuItem;