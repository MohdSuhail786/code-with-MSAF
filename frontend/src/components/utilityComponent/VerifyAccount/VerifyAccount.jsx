import {useEffect, useContext} from 'react'
import HashLoader from "react-spinners/HashLoader";
import {verifyUser} from "./action/index"
import {useParams, useHistory} from 'react-router-dom'
import AppContext from "../../../context/AppContext.jsx";

export default function VerifyAccount() {
    const creds = useParams()
    const history = useHistory()
    const appContext = useContext(AppContext)

    useEffect(()=>{
        verifyUser(creds)
        .then(res=>{
            let severity = "error"
            if(res.status) {
                severity = "success"
            }
            appContext.showSnackbar({message:res.data,severity})
            history.push('/login')
        })
        .catch(err=>{
            appContext.showSnackbar({message:"Bad Request",severity:'error'})
        })
    },[])

    return (
        <div style={{position:'absolute',display:'flex',flexDirection:'column',top:'49%',left:'49%'}}>
            <HashLoader loading={true} />
            <span style={{marginTop:10}}>Verifying...</span>
        </div>
    )
}