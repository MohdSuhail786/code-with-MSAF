import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import CircularProgressBar from '../../utilityComponent/CircularProgress/CircularProgress';
import { useDispatch, useSelector } from 'react-redux';
import { hideProgressBar, showProgressBar } from '../../utilityComponent/CircularProgress/store/action';
import { login } from '../Login/store/action';
import { useContext, useEffect, useState } from "react"
import AppContext from '../../../context/AppContext';
import { setUserData } from '../../../utils';

export default function LoginPopup({open,callback,onClose}) {
  const dispatch = useDispatch()
  const store = useSelector(state => state.auth)
  const appContext = useContext(AppContext)
  const [cred,setCred] = useState({email:'',password:''})
  const handleLogin = async() => {
    dispatch(showProgressBar())
    await dispatch(login(cred))
    dispatch(hideProgressBar())  
  }
  React.useEffect(()=>{
    if(store.auth.status === null) return;
    if(!store.auth.status) {
      appContext.showSnackbar({message:store.auth.data,severity:'error'})
      return;
    }
    const {user,accessToken,refreshToken} = store.auth.data
    appContext.setUserRole(user.role)
    setUserData(user,accessToken,refreshToken)
    appContext.showSnackbar({message:'Login successfull',severity:'success'})
    onClose()
    callback()
  },[store.auth])
  return (
    <>
      <Dialog open={open} onClose={onClose}>
        <CircularProgressBar />
        <DialogTitle>Login</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please login to continue
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Email Address"
            type="email"
            fullWidth
            value={cred.email}
            onChange={(e)=>setCred({...cred,email:e.target.value})}
            variant="outlined"
          />
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Password"
            type="password"
            value={cred.password}
            onChange={(e)=>setCred({...cred,password:e.target.value})}
            fullWidth
            variant="outlined"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button onClick={handleLogin}>Login</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
