import { ChangePage, GetUsername } from "../Controller/OtherController";

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

const userPage = 
[
    {name: 'Books', clickEvent: () => ChangePage("./viewBook"), icon: <MenuBookIcon/>},
    {name: 'BanList', clickEvent: () => ChangePage("./banList"), icon: <BlockIcon/>}
];

const adminPage = 
[
    {name: 'Book Management', clickEvent: () => ChangePage("./viewBook"), icon: <MenuBookIcon/>},
    {name: 'User Management', clickEvent: () => ChangePage("./viewUser"), icon: <PersonIcon/>},
    {name: 'Definition Management', clickEvent: () => {}, icon:<BookmarkBorderIcon/>},
    {name: 'View BanList', clickEvent: () => ChangePage("./banList"), icon: <BlockIcon/>}
];

const settings =
[
    { label: 'View Profile', clickEvent: () => ChangePage("/profile"), icon: <AccountCircleIcon /> },
    { label: 'Issue Record', clickEvent: () => ChangePage(""), icon: <AssignmentIcon /> },
    { label: 'Favourite', clickEvent: () => ChangePage(""), icon: <StarIcon/>},
    { label: 'Logout', clickEvent: () => handleLogout(GetUsername()), icon: <ExitToAppIcon /> }
];

export {userPage, adminPage, settings}