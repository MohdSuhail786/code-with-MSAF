import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { useState } from 'react';
import { useEffect } from 'react';

export default function Alert({open,message,severity,onClose}) {

    const [state,setState] = useState(false);

    useEffect(()=>{setState(open)},[open,message,severity])

    const handleClose = ()=>{
        setState(false);
        onClose();
    }

    return <>
        <Snackbar
            anchorOrigin={{ vertical:'bottom', horizontal:'left' }}
            open={state}
            onClose={handleClose}
            autoHideDuration={6000}
            key={'bottom' + 'left'}
        > 
        <MuiAlert onClose={handleClose} severity={severity} variant="filled" sx={{ width: '100%' }}>
            {message}
            </MuiAlert>
        </Snackbar>
    </>
}