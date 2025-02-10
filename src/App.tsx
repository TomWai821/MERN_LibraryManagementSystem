import './App.css';

// React functions
import React, { Fragment } from 'react';

// Components
import NavNar from './component/NavBar/NavBar';
import RoutesUtils from './component/Utils/RoutesUtils';
import { Box } from '@mui/material';
import { useModal } from './Context/ModalContext';

const App: React.FC = () => 
{
    const { content } = useModal();
    
    return (
        <Fragment>
            <NavNar/>
            <Box className="App">
                <RoutesUtils/>
                {content}
            </Box>
        </Fragment>
    );
}

export default App;
