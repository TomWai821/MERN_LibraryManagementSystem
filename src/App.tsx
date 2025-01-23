import './App.css';
// React Router
import { Routes, Route } from 'react-router-dom';
// Materials UI
import { Box } from '@mui/material';
// Components
import NavNar from './component/NavBar';
import MainPage from './component/Pages/MainPage';
import ViewProfilePage from './component/Pages/ViewProfilePage';
import ViewPages from './component/Pages/ViewPages';
import LoginPage from './component/Pages/LoginPage';
import RegisterPage from './component/Pages/RegisterPage';

const App: React.FC = () => 
{
    return (
        <Box className="App">
            <NavNar/>
                <Routes>
                    <Route path="/" element={<MainPage/>}/>
                    <Route path="/login" element={<LoginPage/>}/>
                    <Route path="/register" element={<RegisterPage/>}/>
                    <Route path="/profile" element={<ViewProfilePage/>}/>
                    <Route path="/viewBook" element={<ViewPages dataType="Book"/>}/>
                    <Route path="/viewUser" element={<ViewPages dataType="User"/>}/>
                </Routes>
        </Box>
    );
}

export default App;
