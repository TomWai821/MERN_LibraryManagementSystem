import './App.css';

// React functions
import React from 'react';

// Components
import NavNar from './component/NavBar/NavBar';

// provider for alert
import { AlertProvider } from './Context/AlertContext';
import { ModalProvider } from './Context/ModalContext';

import ModalUtils from './component/Utils/ModalUtils';
import RoutesUtils from './component/Utils/RoutesUtils';
import { Box } from '@mui/material';
import CreateBookModal from './component/Modal/Book/CreateBookModal';

const App: React.FC = () => 
{
    return (
        <AlertProvider>
            <ModalProvider>
                <ModalUtils/>
                <NavNar/>
                    <Box className="App">
                        <RoutesUtils/>
                    </Box>
            </ModalProvider>
        </AlertProvider>
    );
}

export default App;
