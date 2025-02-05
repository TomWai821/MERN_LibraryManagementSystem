import React, { useState } from 'react';

import { AppBar, Box, Button, Toolbar } from '@mui/material';

import { GetAuthToken, GetRole } from '../../Controller/OtherController';

import { NavSyntaxInterface } from '../../Model/NavModel';

import ProfileMenu from './ProfileMenu';
import NavMenu from './NavMenu';

// Variable for UI format in MUI
const Color = { background: "#00796B", word: "white", wordHover: "#B2DFDB" };
const Transition = "color 1s, background-color 1s";

const NavSyntax: NavSyntaxInterface = { fontSize: 24, transition: Transition, bgcolor: Color.background, color: Color.word, '&:hover': { color: Color.wordHover } };
const MenuItemSyntax = { m: 0, p: 0 };
const AvatarSize = "42px";

const isLoggedIn = GetAuthToken();
const role = GetRole();

const NavBar = () => 
{
    const [anchorElNav, setAnchorElNav] = useState<HTMLElement | null>(null);
    const [anchorElUser, setAnchorElUser] = useState<HTMLElement | null>(null);

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
                    <Button sx={{ fontSize: 32, mr: 3, bgcolor: Color.background, color: Color.word }} href="./">Library</Button>
                </Box>

                <NavMenu  isLoggedIn={isLoggedIn} role={role} AvatarSize={AvatarSize} NavSyntax={NavSyntax} anchorElNav={anchorElNav} 
                    MenuItemSyntax={MenuItemSyntax} handleNavMenu={handleNavMenu} />

                <ProfileMenu isLoggedIn={isLoggedIn} role={role} AvatarSize={AvatarSize} NavSyntax={NavSyntax} 
                    MenuItemSyntax={MenuItemSyntax} anchorElUser={anchorElUser} handleUserMenu={handleUserMenu}/>

            </Toolbar>
        </AppBar>
    );
}

export default NavBar;
