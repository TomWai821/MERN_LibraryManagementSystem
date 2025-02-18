import { Box, ListItemIcon, Menu, MenuItem, Typography } from "@mui/material"

import { FC } from "react";
import { NavMenuInterface } from "../../Model/NavModel";
import { adminPage, externalUserPage, userPage } from '../../Maps/NavMaps'
import CustomMenuItem from "../UIFragment/MenuItem/CustomMenuItem";


const NavMenu:FC<NavMenuInterface> = ({isLoggedIn, role, AvatarSize, anchorElNav, handleNavMenu, NavSyntax}) => 
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
                {!isLoggedIn ? 
                    <CustomMenuItem pages={externalUserPage}/>:
                    (role === 'Admin' ? <CustomMenuItem pages={adminPage}/>:<CustomMenuItem pages={userPage}/>)
                }
                </Menu>
        </Box>
    )
}

export default NavMenu