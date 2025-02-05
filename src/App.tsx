import './App.css';
// React Router
import { Routes, Route } from 'react-router-dom';
// Materials UI
import { Box } from '@mui/material';
// Components
import NavNar from './component/NavBar/NavBar';
import MainPage from './component/Pages/MainPage';
import ViewProfilePage from './component/Pages/ViewProfilePage';
import LoginPage from './component/Pages/LoginPage';
import RegisterPage from './component/Pages/RegisterPage';
import UserPage from './component/Pages/TablePages/UserPage';
import BookPage from './component/Pages/TablePages/BookPage';

// provider for alert
import { AlertProvider } from './Context/AlertContext';

const App: React.FC = () => 
{
    return (
        <AlertProvider>
            <Box className="App">
                <NavNar/>
                    <Routes>
                        <Route path="/" element={<MainPage/>}/>
                        <Route path="/login" element={<LoginPage/>}/>
                        <Route path="/register" element={<RegisterPage/>}/>
                        <Route path="/profile" element={<ViewProfilePage/>}/>
                        <Route path="/viewBook" element={<BookPage/>}/>
                        <Route path="/viewUser" element={<UserPage/>}/>
                    </Routes>
            </Box>
        </AlertProvider>
    );
}

export default App;
