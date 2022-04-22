import React, { useEffect, useContext, useState } from "react";
import { Link } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Button,
  FormGroup,
  FormText,
  Input,
} from "reactstrap";
import Widget from "../../components/Widget/Widget";
import Footer from "../../components/Footer/Footer";
import AppContext from "../../../../context/AppContext";
import loginImage from "../../assets/loginImage.svg";
import SofiaLogo from "../../components/Icons/SofiaLogo.js";
import GoogleIcon from "../../components/Icons/AuthIcons/GoogleIcon.js";
import TwitterIcon from "../../components/Icons/AuthIcons/TwitterIcon.js";
import FacebookIcon from "../../components/Icons/AuthIcons/FacebookIcon.js";
import GithubIcon from "../../components/Icons/AuthIcons/GithubIcon.js";
import LinkedinIcon from "../../components/Icons/AuthIcons/LinkedinIcon.js";
import {useDispatch, useSelector} from 'react-redux'
import {login} from "./store/action/index"
import { setUserData } from "../../../../utils";
import { useHistory, useLocation } from "react-router-dom";

const Login = (props) => {
  const dispatch = useDispatch()
  const [state, setState] = useState({
    email: '',
    password: '',
  })
  const history = useHistory()
  const store = useSelector(state => state.auth)
  const appContext = useContext(AppContext)
  const query = new URLSearchParams(useLocation().search)
  const redirectUrl = query.get("ref") ? query.get("ref") : "/"
  useEffect(()=>{
    if(store.auth.status === null) return;
    if(!store.auth.status) {
      appContext.showSnackbar({message:store.auth.data,severity:'error'})
      return;
    }
    history.push(redirectUrl)
    const {user,accessToken,refreshToken} = store.auth.data
    appContext.setUserRole(user.role)
    setUserData(user,accessToken,refreshToken)
    appContext.showSnackbar({message:'Login successfull',severity:'success'})
  },[store.auth])

  const doLogin = (e) => {
    e.preventDefault();
    dispatch(login(state)) 
  }

  const changeCreds = (event) => {
    setState({ ...state, [event.target.name]: event.target.value })
  }

  return (
    <div className="auth-page">
      <Container className="col-12">
        <Row className="d-flex align-items-center">
          <Col xs={12} lg={6} className="left-column">
            <Widget className="widget-auth widget-p-lg">
              <div className="d-flex align-items-center justify-content-between py-3">
                <p className="auth-header mb-0">Login</p>
                <div className="logo-block">
                  <SofiaLogo />
                  <p className="mb-0">CodingWorm</p>
                </div>
              </div>
              <div className="auth-info my-2">
                <p>Please sign-in to your account and start the adventure</p>
              </div>
              <form onSubmit={(event) => doLogin(event)}>
                <FormGroup className="my-3">
                  <FormText>Email</FormText>
                  <Input
                    id="email"
                    className="input-transparent pl-3"
                    value={state.email}
                    onChange={(event) => changeCreds(event)}
                    type="email"
                    required
                    name="email"
                    placeholder="Email"
                  />
                </FormGroup>
                <FormGroup  className="my-3">
                  <div className="d-flex justify-content-between">
                    <FormText>Password</FormText>
                    <Link to="/error">Forgot password?</Link>
                  </div>
                  <Input
                    id="password"
                    className="input-transparent pl-3"
                    value={state.password}
                    onChange={(event) => changeCreds(event)}
                    type="password"
                    required
                    name="password"
                    placeholder="Password"
                  />
                </FormGroup>
                <div className="bg-widget d-flex justify-content-center">
                  <Button className="rounded-pill my-3" type="submit" color="secondary-red">Login</Button>
                </div>
                <p className="dividing-line my-3">&#8195;Or&#8195;</p>
                <div className="d-flex align-items-center my-3">
                  <p className="social-label mb-0">Login with</p>
                  <div className="socials">
                    <a href="https://flatlogic.com/"><GoogleIcon /></a>
                    <a href="https://flatlogic.com/"><TwitterIcon /></a>
                    <a href="https://flatlogic.com/"><FacebookIcon /></a>
                    <a href="https://flatlogic.com/"><GithubIcon /></a>
                    <a href="https://flatlogic.com/"><LinkedinIcon /></a>
                  </div>
                </div>
                <Link to="/signup">Don’t have an account? Sign Up here</Link>
              </form>
            </Widget>
          </Col>
          <Col xs={0} lg={6} className="right-column">
            <div>
              <img src={loginImage} alt="Error page" />
            </div>
          </Col>
        </Row>
      </Container>
      <Footer />
    </div>
  )
}

export default Login
