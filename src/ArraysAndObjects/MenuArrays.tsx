import { ChangePage, GetData } from "../Controller/OtherController";

import { handleLogout } from "../Controller/OtherUsefulController";

// MUI Image
import MenuBookIcon from '@mui/icons-material/MenuBook';
import PersonIcon from '@mui/icons-material/Person'
import BlockIcon from '@mui/icons-material/Block'
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AssignmentIcon from '@mui/icons-material/Assignment';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import EmailIcon from '@mui/icons-material/Email';

// For navigation bar
const externalUserPage = 
[
    {name: 'Books', clickEvent: () => ChangePage("./viewBook"), icon: <MenuBookIcon/>}
];

const userPage = 
[
    ...externalUserPage,
    {name: 'Suspend User', clickEvent: () => ChangePage("./viewUser"), icon: <BlockIcon/>}
];

const adminPage = 
[
    {name: 'Book Management', clickEvent: () => ChangePage("./viewBook"), icon: <MenuBookIcon/>},
    {name: 'User Management', clickEvent: () => ChangePage("./viewUser"), icon: <PersonIcon/>},
    {name: 'Contact Data Management', clickEvent: () => ChangePage("./contact"), icon:<EmailIcon/>},
    {name: 'Definition Management', clickEvent: () => ChangePage("./defination"), icon:<BookmarkBorderIcon/>}
];

const settings =
[
    { label: 'View Profile', clickEvent: () => ChangePage("/profile"), icon: <AccountCircleIcon /> },
    { label: 'Records', clickEvent: () => ChangePage("/records"), icon: <AssignmentIcon /> },
    { label: 'Logout', clickEvent: () => handleLogout(GetData("username") as string | null), icon: <ExitToAppIcon /> }
];

export {externalUserPage, userPage, adminPage, settings}