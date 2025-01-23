import { useState } from 'react';

import { AppBar, Avatar, Box, Button, IconButton, Menu, MenuItem, Toolbar, Typography } from '@mui/material';

import { handleLogout } from '../Controller/UserController/UserController';
import { getUserCookie } from '../Controller/CookieController';
import { ChangePage } from '../Controller/OtherController';

const isLoggedIn = getUserCookie("authToken");
const username = getUserCookie("name");
const role = getUserCookie("role");

// Variable for UI format in MUI
const Color = { background: "#00796B", word: "white", wordHover: "#B2DFDB" };
const Transition = "color 1s, background-color 1s";
const AvatarSize = "56px";

const NavSyntax = { fontSize: 24, transition: Transition, bgcolor: Color.background, color: Color.word, '&:hover': { color: Color.wordHover } };
const MenuItemSyntax = { m: 0, p: 0 };

const settings = 
[
    { label: 'View Profile', clickEvent: () => ChangePage("/profile") },
    { label: 'Issue Record', clickEvent: () => ChangePage("") },
    { label: 'Logout', clickEvent: () => handleLogout(username) }
];

const NavBar = () => 
{
    const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
    const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

    const handleNavMenu = (event: React.MouseEvent<HTMLElement>) => 
    {
        setAnchorElNav(anchorElNav ? null : event?.currentTarget);
    };

    const handleUserMenu = (event: React.MouseEvent<HTMLElement>) => 
    {
        setAnchorElUser(anchorElUser ? null : event?.currentTarget);
    };

    return (
        <AppBar position="static" sx={{ bgcolor: Color.background }}>
            <Toolbar>
                <Box>
                    <Button sx={{ fontSize: 36, mr: 3, bgcolor: Color.background, color: Color.word }} href="./">Library</Button>
                </Box>
                
                <Box sx={{ flexGrow: 1 }}>
                    <Typography onClick={handleNavMenu} width={'75px'} sx={{ fontSize: 28, ml: '30px', '&:hover': { cursor: 'pointer', color: Color.wordHover } }}>
                        {isLoggedIn && role === 'Admin' ? "Manage" : "View"}
                    </Typography>
                    <Menu
                        sx={{ mt: AvatarSize}}
                        id="menu-appbar"
                        anchorEl={anchorElNav}
                        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
                        keepMounted
                        transformOrigin={{ vertical: 'top', horizontal: 'left' }}
                        open={Boolean(anchorElNav)}
                        onClose={handleNavMenu}
                    >
                        {isLoggedIn && role === 'Admin' ?
                            <>
                                <MenuItem sx={MenuItemSyntax}>
                                    <Typography onClick={() => ChangePage("./viewBook")} width={'100%'} sx={NavSyntax}>
                                        Book Management
                                    </Typography>
                                </MenuItem>
                                
                                <MenuItem sx={MenuItemSyntax}>
                                    <Typography onClick={() => ChangePage("./viewUser")} width={'100%'} sx={NavSyntax}>
                                        User Management
                                    </Typography>
                                </MenuItem>
                            </>
                            :
                            <>
                                <MenuItem sx={MenuItemSyntax}>
                                    <Typography onClick={() => ChangePage("./viewBook")} width={'100%'} sx={NavSyntax}>
                                        Books
                                    </Typography>
                                </MenuItem>

                                <MenuItem sx={MenuItemSyntax}>
                                    <Typography onClick={() => ChangePage("./banList")} width={'100%'} sx={{...NavSyntax}}>
                                        BanList
                                    </Typography>
                                </MenuItem>
                            </>
                        }
                    </Menu>
                </Box>

                {isLoggedIn ?
                    <Box>
                        <IconButton onClick={handleUserMenu}>
                            <Avatar alt="" src="/static/images/avatar/2.jpg" sx={{ width: AvatarSize, height: AvatarSize }} />
                        </IconButton>
                        <Menu
                            sx={{ mt: AvatarSize }}
                            anchorEl={anchorElUser}
                            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                            keepMounted
                            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                            open={Boolean(anchorElUser)}
                            onClose={handleUserMenu}
                        >
                            {settings.map((setting) => (
                                <MenuItem key={setting.label} onClick={handleUserMenu} sx={MenuItemSyntax}>
                                    <Typography onClick={setting.clickEvent} width={'100%'} sx={NavSyntax}>{setting.label}</Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                    :
                    <Box>
                        <Button sx={{...NavSyntax, mr: '30px' }} href="./login">Login</Button>
                        <Button sx={NavSyntax} href="./register">Register</Button>
                    </Box>
                }
            </Toolbar>
        </AppBar>
    );
}

export default NavBar;
