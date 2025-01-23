import { useState, useEffect, FC } from 'react';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { AlertInterface } from '../Model/AlertModel';

const SendAlert: FC<AlertInterface> = ({ AlertType, Message, Timer }) => 
{
    const [openAlert, setOpenAlert] = useState(true); 

    useEffect(() => {
        if (openAlert) 
        {
            const timer = setTimeout(() => 
            {
                setOpenAlert(false);
            }, Timer);

            return () => clearTimeout(timer);
        }
    }, [openAlert, Timer]);

    return (
        <Snackbar open={openAlert} autoHideDuration={Timer} onClose={() => setOpenAlert(false)}>
            <Alert onClose={() => setOpenAlert(false)} severity={AlertType}>
                {Message}
            </Alert>
        </Snackbar>
    );
};

export default SendAlert;
