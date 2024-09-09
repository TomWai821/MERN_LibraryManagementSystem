import './App.css';
import NavNar from './component/NavBar';
import Login from './component/Login'
import Register from './component/Register'
import { Routes,Route, useRoutes } from 'react-router-dom';

const App: React.FC = () => 
{
    return (
        <div className="App">
            <NavNar/>
                <Routes>
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/register" element={<Register/>}/>
                </Routes>
        </div>
    );
}

export default App;
