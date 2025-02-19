import { FC } from 'react';
import { Avatar, Box, Button, Divider, IconButton, ListItemIcon, Menu, MenuItem, Typography } from "@mui/material"
import { ProfileMenuInterface } from '../../Model/NavModel';
import { settings } from '../../Maps/NavMaps';
import { GetUsername } from '../../Controller/OtherController';

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
                        <Typography sx={{ fontWeight: 'bold' }}>{GetUsername()}</Typography>
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