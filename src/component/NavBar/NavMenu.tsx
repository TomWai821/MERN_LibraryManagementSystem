import { Box, ListItemIcon, Menu, MenuItem, Typography } from "@mui/material"

import { FC } from "react";
import { NavMenuInterface } from "../../Model/NavModel";
import { adminPage, userPage } from '../../Model/UIRenderingModel/NavModel'


const NavMenu:FC<NavMenuInterface> = ({isLoggedIn, role, AvatarSize, anchorElNav, handleNavMenu, NavSyntax, MenuItemSyntax}) => 
{
    const SetNavName = (isLoggedIn && role === 'Admin') ? "Manage" : "View";

    return(
        <Box sx={{ flexGrow: 1 }}>
            <Typography onClick={handleNavMenu} width={'60px'} sx={{ fontSize: 24, ml: '20px', '&:hover': { cursor: 'pointer', color: NavSyntax.color } }}>
            {SetNavName}
            </Typography>
                <Menu
                    sx={{ mt: AvatarSize }}
                    id="menu-appbar"
                    anchorEl={anchorElNav}
                    anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
                    keepMounted
                    transformOrigin={{ vertical: 'top', horizontal: 'left' }}
                    open={Boolean(anchorElNav)}
                    onClose={handleNavMenu}
                >
                {isLoggedIn && role === 'Admin' ?
                    adminPage.map((page, index) => (
                        <MenuItem key={index} sx={{MenuItemSyntax, NavSyntax}}>
                            <ListItemIcon>{page.icon}</ListItemIcon>
                            <Typography onClick={page.clickEvent} width={'100%'}>{page.name}</Typography>
                         </MenuItem>
                    ))
                    :
                    userPage.map((page, index) => (
                        <MenuItem key={index} sx={{ MenuItemSyntax, NavSyntax }}>
                            <ListItemIcon>{page.icon}</ListItemIcon>
                            <Typography onClick={page.clickEvent} width={'100%'} >{page.name}</Typography>
                        </MenuItem>
                    ))
                }
                </Menu>
        </Box>
    )
}

export default NavMenu