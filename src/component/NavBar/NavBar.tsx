import React, { useState } from 'react';

import { AppBar, Box, Button, Toolbar } from '@mui/material';

import { IsLoggedIn, GetRole } from '../../Controller/OtherController';

import { AvatarSize, MenuItemSyntax, NavColor, NavSyntax } from '../../Model/UIRenderingModel/FormatSyntaxModel';

import ProfileMenu from './ProfileMenu';
import NavMenu from './NavMenu';

const isLoggedIn = IsLoggedIn();
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
        <AppBar position="static" sx={{ bgcolor: NavColor.background }}>
            <Toolbar>
                <Box>
                    <Button sx={{ fontSize: 32, mr: 3, bgcolor: NavColor.background, color: NavColor.word }} href="./">Library</Button>
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
