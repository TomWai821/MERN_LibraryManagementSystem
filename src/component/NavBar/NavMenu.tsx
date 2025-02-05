import { Box, ListItemIcon, Menu, MenuItem, Typography } from "@mui/material"
import { ChangePage } from "../../Controller/OtherController";

// MUI Image
import MenuBookIcon from '@mui/icons-material/MenuBook';
import PersonIcon from '@mui/icons-material/Person'
import BlockIcon from '@mui/icons-material/Block'
import { FC } from "react";
import { NavMenuInterface } from "../../Model/NavModel";

const userPage = 
[
    {name: 'Books', clickEvent: () => ChangePage("./viewBook"), icon: <MenuBookIcon/>},
    {name: 'BanList', clickEvent: () => ChangePage("./banList"), icon: <BlockIcon/>}
];

const adminPage = 
[
    {name: 'Book Management', clickEvent: () => ChangePage("./viewBook"), icon: <MenuBookIcon/>},
    {name: 'User Management', clickEvent: () => ChangePage("./viewUser"), icon: <PersonIcon/>},
    {name: 'View BanList', clickEvent: () => ChangePage("./banList"), icon: <BlockIcon/>}
];

const NavMenu:FC<NavMenuInterface> = ({isLoggedIn, role, AvatarSize, anchorElNav, handleNavMenu, NavSyntax, MenuItemSyntax}) => 
{
    return(
        <Box sx={{ flexGrow: 1 }}>
            <Typography onClick={handleNavMenu} width={'60px'} sx={{ fontSize: 24, ml: '20px', '&:hover': { cursor: 'pointer', color: NavSyntax.color } }}>
            {isLoggedIn && role === 'Admin' ? "Manage" : "View"}
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
                    adminPage.map((page) => (
                        <>
                            <MenuItem sx={{MenuItemSyntax, NavSyntax}}>
                                <ListItemIcon>{page.icon}</ListItemIcon>
                                <Typography onClick={page.clickEvent} width={'100%'}>{page.name}</Typography>
                            </MenuItem>
                        </>
                    ))
                    :
                    userPage.map((page) => (
                        <>
                            <MenuItem sx={{ MenuItemSyntax, NavSyntax }}>
                                <ListItemIcon>{page.icon}</ListItemIcon>
                                <Typography onClick={page.clickEvent} width={'100%'} >{page.name}</Typography>
                            </MenuItem>
                        </>
                    ))
                }
                </Menu>
        </Box>
    )
}

export default NavMenu