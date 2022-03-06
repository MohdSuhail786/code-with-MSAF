import logo from "../../../assets/images/logo.png"
import {ReactComponent as Register} from "../../../assets/images/register-v2.svg"

function Signup() {

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
                <input placeholder="johndoe"></input>
              </span>
              <span>
                Email
                <input placeholder="johndoe@gmail.com"></input>
              </span>
              <span>
                Password
                <input type="password" placeholder="****"></input>
              </span>
             <div>
               <input type="checkbox" className="largecheckbox"></input>
               <label>I agree to<a href="#" className="policy">&nbsp;privacy policy & terms</a></label>
             </div>
             <button className="signup_button">Sign up</button>
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
