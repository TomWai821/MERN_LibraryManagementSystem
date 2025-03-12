import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { AlertProvider } from './Context/AlertContext';
import { ModalProvider } from './Context/ModalContext';
import { AllUserProvider } from './Context/User/AllUserContext';
import { BannedUserProvider } from './Context/User/BannedUserContext';
import { DeleteUserProvider } from './Context/User/DeleteUserContext';
import { DefinationProvider } from './Context/Book/DefinationContext';

const root = ReactDOM.createRoot
(
    document.getElementById('root') as HTMLElement
);

root.render
(
    <DefinationProvider>
        <AllUserProvider>
            <DeleteUserProvider>
                <BannedUserProvider>
                    <AlertProvider>
                        <ModalProvider>
                            <BrowserRouter>
                                <App />
                            </BrowserRouter>
                        </ModalProvider>
                    </AlertProvider>
                </BannedUserProvider>
            </DeleteUserProvider>
        </AllUserProvider>
    </DefinationProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
