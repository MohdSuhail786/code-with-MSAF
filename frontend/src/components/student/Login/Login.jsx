import logo from "../../../assets/images/logo.png"
import {ReactComponent as Register} from "../../../assets/images/login-v2.svg"
import {useDispatch,useSelector} from 'react-redux'
import {login} from "./store/action/index"
import { useContext, useEffect, useState } from "react"
import AppContext from "../../../context/AppContext"
import { setUserData } from "../../../utils"

function Login() {
  const [cred,setCred] = useState({email:'',password:''})
  const dispatch = useDispatch()
  const appContext = useContext(AppContext)
  const store = useSelector(state => state.auth)

  const signIn = () => {
    dispatch(login(cred))  
  }

  useEffect(()=>{
    if(store.auth.status === null) return;
    if(!store.auth.status) {
      appContext.showSnackbar({message:store.auth.data,severity:'error'})
      return;
    }
    const {user,accessToken,refreshToken} = store.auth.data
    appContext.setUserRole(user.role)
    setUserData(user,accessToken,refreshToken)
    appContext.showSnackbar({message:'Login successfull',severity:'success'})
  },[store.auth])

  return (
    <>
      <div className="signup_body">
        <div className="signup_container">
          <div className="signup_header">
            <img src={logo}></img>
            <span>Coding Worm</span>
          </div>
          <Register className="signup_body_svg"/>
        </div>
        <div className="signup_body_content">
            <h2>Adventure starts here 👋</h2>
            <div className="signup_body_subheading">
              <span>Please sign-in to your account and start the adventure</span>
            </div>
            <div className="signup_form">
              <span>
                Email
                <input placeholder="johndoe@gmail.com" value={cred.email} onChange={(e)=>setCred({...cred,email:e.target.value})}></input>
              </span>
              <span>
                Password
                <input type="password" placeholder="****" value={cred.password} onChange={(e)=>setCred({...cred,password:e.target.value})}></input>
              </span>
             <div>
               <input type="checkbox" className="largecheckbox"></input>
               <label>Remember Me</label>
             </div>
             <button className="signup_button" onClick={signIn}>Sign in</button>
             <span>
             <label>New on our platform?<a href="/signup" className="policy">&nbsp;Create an account</a></label>
             </span>
            </div>
          </div>
      </div>
    </>
  )
}

export default Login;
