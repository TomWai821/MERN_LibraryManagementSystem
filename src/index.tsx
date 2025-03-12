import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { AlertProvider } from './Context/AlertContext';
import { ModalProvider } from './Context/ModalContext';
import { UserProvider } from './Context/User/UserContext';
import { DefinationProvider } from './Context/Book/DefinationContext';

const root = ReactDOM.createRoot
(
    document.getElementById('root') as HTMLElement
);

root.render
(
    <DefinationProvider>
        <UserProvider>
            <AlertProvider>
                <ModalProvider>
                    <BrowserRouter>
                        <App />
                    </BrowserRouter>
                </ModalProvider>
            </AlertProvider>
        </UserProvider>
    </DefinationProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
