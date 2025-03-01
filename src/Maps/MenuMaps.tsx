import { ChangePage, GetData } from "../Controller/OtherController";

import { handleLogout } from "../Controller/UserController/UserOtherController";

// MUI Image
import MenuBookIcon from '@mui/icons-material/MenuBook';
import PersonIcon from '@mui/icons-material/Person'
import BlockIcon from '@mui/icons-material/Block'
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AssignmentIcon from '@mui/icons-material/Assignment';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import StarIcon from '@mui/icons-material/Star';

// For navigation bar
const externalUserPage = 
[
    {name: 'Books', clickEvent: () => ChangePage("./viewBook"), icon: <MenuBookIcon/>}
];

const userPage = 
[
    ...externalUserPage,
    {name: 'BanList', clickEvent: () => ChangePage("./viewUser"), icon: <BlockIcon/>}
];

const adminPage = 
[
    {name: 'Book Management', clickEvent: () => ChangePage("./viewBook"), icon: <MenuBookIcon/>},
    {name: 'User Management', clickEvent: () => ChangePage("./viewUser"), icon: <PersonIcon/>},
    {name: 'Definition Management', clickEvent: () => ChangePage("./defination"), icon:<BookmarkBorderIcon/>}
];

const settings =
[
    { label: 'View Profile', clickEvent: () => ChangePage("/profile"), icon: <AccountCircleIcon /> },
    { label: 'Issue Record', clickEvent: () => ChangePage(""), icon: <AssignmentIcon /> },
    { label: 'Favourite', clickEvent: () => ChangePage(""), icon: <StarIcon/>},
    { label: 'Logout', clickEvent: () => handleLogout(GetData("username") as string | null), icon: <ExitToAppIcon /> }
];

export {externalUserPage, userPage, adminPage, settings}