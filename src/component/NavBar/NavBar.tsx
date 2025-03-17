import React, { FC, useState } from 'react';

import { AppBar, Box, Button, Toolbar } from '@mui/material';

import { AvatarSize, MenuItemSyntax, NavColor, NavSyntax } from '../../Maps/FormatSyntaxMaps';

import ProfileMenu from './ProfileMenu';
import NavMenu from './NavMenu';
import { PagesInterface } from '../../Model/TablePagesAndModalModel';

const NavBar:FC<PagesInterface> = (loginData) => 
{
    const {isAdmin, isLoggedIn, role, avatarUrl, status, username} = loginData;

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
                    <Button sx={{ fontSize: 32, marginRight: 3, bgcolor: NavColor.background, color: NavColor.word }} href="./">Library</Button>
                </Box>

                <NavMenu isLoggedIn={isLoggedIn} role={role} AvatarSize={AvatarSize} NavSyntax={NavSyntax} anchorElNav={anchorElNav}
                MenuItemSyntax={MenuItemSyntax} handleNavMenu={handleNavMenu} isAdmin={isAdmin} avatarUrl={avatarUrl} status={status} />

                <ProfileMenu isLoggedIn={isLoggedIn} role={role} AvatarSize={AvatarSize} NavSyntax={NavSyntax}
                MenuItemSyntax={MenuItemSyntax} anchorElUser={anchorElUser} handleUserMenu={handleUserMenu} isAdmin={isAdmin} avatarUrl={avatarUrl} status={status} username={username as string}/>

            </Toolbar>
        </AppBar>
    );
}

export default NavBar;
