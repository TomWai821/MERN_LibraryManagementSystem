import { FC } from 'react';
import { Avatar, Box, Button, Divider, IconButton, ListItemIcon, Menu, MenuItem, Typography } from "@mui/material"

import { handleLogout } from '../../Controller/UserController/UserController';

import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AssignmentIcon from '@mui/icons-material/Assignment';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

import { getUserCookie } from "../../Controller/CookieController";
import { ChangePage } from "../../Controller/OtherController";
import { ProfileMenuInterface } from '../../Model/NavModel';

const settings =
[
    { label: 'View Profile', clickEvent: () => ChangePage("/profile"), icon: <AccountCircleIcon /> },
    { label: 'Issue Record', clickEvent: () => ChangePage(""), icon: <AssignmentIcon /> },
    { label: 'Logout', clickEvent: () => handleLogout(username), icon: <ExitToAppIcon /> }
];

const username = getUserCookie("username") || sessionStorage.getItem("username");

const ProfileMenu:FC<ProfileMenuInterface> = ({isLoggedIn, role, AvatarSize, anchorElUser, handleUserMenu, NavSyntax, MenuItemSyntax}) => 
{
    return(
        isLoggedIn ?
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
                <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'row', padding: '10px 0 10px 0' }}>
                    <Avatar alt="" src="/static/images/avatar/2.jpg" sx={{ width: AvatarSize, height: AvatarSize, margin: '0 5px 0 10px' }} />
                    <Box sx={{ display: 'block', flexDirection: 'column', marginLeft: '10px' }}>
                        <Typography sx={{ fontSize: '24px', fontWeight: 'bold' }}>{username}</Typography>
                        <Typography>{role}</Typography>
                    </Box>

                </Box>
                <Divider/>
                {settings.map((setting) => (
                    <MenuItem key={setting.label} onClick={handleUserMenu} sx={{ MenuItemSyntax, NavSyntax }}>
                        <ListItemIcon>
                            {setting.icon}
                        </ListItemIcon>
                        <Typography onClick={setting.clickEvent} width={'100%'}>{setting.label}</Typography>
                    </MenuItem>
                ))}
            </Menu>
        </Box>
        :
        <Box>
            <Button sx={{ ...NavSyntax, mr: '30px' }} href="./login">Login</Button>
            <Button sx={NavSyntax} href="./register">Register</Button>
        </Box>
    )
}

export default ProfileMenu