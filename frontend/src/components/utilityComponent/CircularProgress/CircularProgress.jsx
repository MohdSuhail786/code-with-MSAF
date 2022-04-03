import CircularProgress from "@mui/material/CircularProgress";
import Backdrop from '@mui/material/Backdrop';
import { useSelector } from "react-redux";

export default function CircularProgressBar() {
    const state = useSelector(state => state.progressBar)
    
    return <Backdrop
    sx={{ color: '#000',background:"transparent", zIndex: (theme) => theme.zIndex.drawer + 1 }}
    open={state}
    >
    <CircularProgress color="inherit" />
    </Backdrop>
}