import "./Signup.css"
import logo from "../../../assets/images/logo.png"
import {ReactComponent as Register} from "../../../assets/images/register-v2.svg"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useContext } from "react"
import AppContext from "../../../context/AppContext"
import { signup } from "./store/action"
import { useHistory } from "react-router-dom"
import { studentLoginRoute } from "../../../config"
import { useLayoutEffect } from "react"

function Signup() {

  const [state,setState] = useState({
    name:'',
    email:'',
    password:''
  })
  const appContext = useContext(AppContext)

  const signUp = () => {
    signup(state)
    .then(res => {
      let severity = "error"
      if(res.status) {
        severity = "success"
      }
      appContext.showSnackbar({message:res.data,severity})
    })
    .catch(err => {
      appContext.showSnackbar({message:"Bad Request",severity:'error'})
    })
  }

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
            <h2>Adventure starts here 🚀</h2>
            <div className="signup_body_subheading">
              <span>Make your coding journey easy and fun!</span>
            </div>
            <div className="signup_form">
              <span>
                Username
                <input value={state.name} onChange={(e)=>setState({...state,name:e.target.value})} placeholder="johndoe"></input>
              </span>
              <span>
                Email
                <input value={state.email} onChange={(e)=>setState({...state,email:e.target.value})} placeholder="johndoe@gmail.com"></input>
              </span>
              <span>
                Password
                <input value={state.password} onChange={(e)=>setState({...state,password:e.target.value})} type="password" placeholder="****"></input>
              </span>
             <div>
               <input type="checkbox" className="largecheckbox"></input>
               <label>I agree to<a href="#" className="policy">&nbsp;privacy policy & terms</a></label>
             </div>
             <button className="signup_button" onClick={signUp}>Sign up</button>
             <span>
             <label>Already have an account?<a href="/login" className="policy">&nbsp;Sign in instead</a></label>
             </span>
            </div>
          </div>
      </div>
    </>
  )
}

export default Signup;
