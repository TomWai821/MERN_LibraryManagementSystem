import './App.css';

// React functions
import React, { Fragment } from 'react';

// Components
import NavNar from './component/NavBar/NavBar';
import RoutesUtils from './component/Utils/RoutesUtils';
import { Box } from '@mui/material';
import { useModal } from './Context/ModalContext';
import { GetData, IsAdmin, IsLoggedIn } from './Controller/OtherController';

const role = GetData("role") as string | undefined;
const avatarUrl = GetData("avatarUrl") as string | undefined;
const status = GetData("status") as string | undefined;
const username = GetData("username") as string | undefined;
const isAdmin:boolean = IsAdmin(role);
const isLoggedIn:boolean = IsLoggedIn();

const App: React.FC = () => 
{
    const { content } = useModal();
    
    return (
        <Fragment>
            <NavNar role={role} isLoggedIn={isLoggedIn} isAdmin={isAdmin} avatarUrl={avatarUrl} status={status}/>
            <Box className="App">
                <RoutesUtils role={role} isLoggedIn={isLoggedIn} isAdmin={isAdmin} avatarUrl={avatarUrl} status={status}/>
                {content}
            </Box>
        </Fragment>
    );
}

export default App;
