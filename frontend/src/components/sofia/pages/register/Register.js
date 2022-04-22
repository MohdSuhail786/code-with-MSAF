import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { withRouter, Redirect, Link, useHistory } from "react-router-dom";
import { connect, useDispatch, useSelector } from "react-redux";
import {
  Container,
  Row,
  Col,
  Button,
  FormGroup,
  FormText,
  Input,
} from "reactstrap";
import Widget from "../../components/Widget/Widget.js";
import Footer from "../../components/Footer/Footer.js";

import loginImage from "../../assets/registerImage.svg";
import SofiaLogo from "../../components/Icons/SofiaLogo.js";
import GoogleIcon from "../../components/Icons/AuthIcons/GoogleIcon.js";
import TwitterIcon from "../../components/Icons/AuthIcons/TwitterIcon.js";
import FacebookIcon from "../../components/Icons/AuthIcons/FacebookIcon.js";
import GithubIcon from "../../components/Icons/AuthIcons/GithubIcon.js";
import LinkedinIcon from "../../components/Icons/AuthIcons/LinkedinIcon.js";
import { signup } from "../../../student/Signup/store/action/index.js";
import AppContext from "../../../../context/AppContext.jsx";
import { studentLoginRoute } from "../../../../config/index.js";

const Register = (props) => {
  const [state, setState] = useState({ name:'', email: '', password: ''} )
  const appContext = useContext(AppContext)
  const changeCred = (event) => {
    setState({ ...state, [event.target.name]: event.target.value })
  }

  const doRegister = (event) => {
    event.preventDefault();
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

  const { from } = props.location.state || { from: { pathname: '/template' } }

  return (
    <div className="auth-page">
      <Container className="col-12">
        <Row className="d-flex align-items-center">
          <Col xs={12} lg={6} className="left-column">
            <Widget className="widget-auth widget-p-lg">
              <div className="d-flex align-items-center justify-content-between py-3">
                <p className="auth-header mb-0">Sign Up</p>
                <div className="logo-block">
                  <SofiaLogo />
                  <p className="mb-0">CodingWorm</p>
                </div>
              </div>
              <div className="auth-info my-2">
                <p>Please sign-up to your account and start the adventure</p>
              </div>
              <form onSubmit={(event => doRegister(event))}>
              <FormGroup className="my-3">
                  <FormText>Name</FormText>
                  <Input
                    id="name"
                    className="input-transparent pl-3"
                    value={state.name}
                    onChange={(event) => changeCred(event)}
                    type="text"
                    required
                    name="name"
                    placeholder="Place your name here"
                  />
                </FormGroup>
                <FormGroup className="my-3">
                  <FormText>Email</FormText>
                  <Input
                    id="email"
                    className="input-transparent pl-3"
                    value={state.email}
                    onChange={(event) => changeCred(event)}
                    type="email"
                    required
                    name="email"
                    placeholder="Place your email here"
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
                    onChange={(event => changeCred(event))}
                    type="password"
                    required
                    name="password"
                    placeholder="Place your password here"
                  />
                </FormGroup>
                <div className="bg-widget d-flex justify-content-center">
                  <Button className="rounded-pill my-3" type="submit" color="secondary-red">Sign Up</Button>
                </div>
                <p className="dividing-line my-3">&#8195;Or&#8195;</p>
                {/* <div className="d-flex align-items-center my-3">
                  <p className="social-label mb-0">Login with</p>
                  <div className="socials">
                    <a href="https://flatlogic.com/"><GoogleIcon /></a>
                    <a href="https://flatlogic.com/"><TwitterIcon /></a>
                    <a href="https://flatlogic.com/"><FacebookIcon /></a>
                    <a href="https://flatlogic.com/"><GithubIcon /></a>
                    <a href="https://flatlogic.com/"><LinkedinIcon /></a>
                  </div>
                </div> */}
                <Link to="/login">Enter the account</Link> <br></br>
                <Link to="/org/signup">Register as Institution</Link>
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

Register.propTypes = {
  dispatch: PropTypes.func.isRequired,
}

function mapStateToProps(state) {
  return {
    isFetching: state.auth.isFetching,
    isAuthenticated: state.auth.isAuthenticated,
    errorMessage: state.auth.errorMessage,
  };
}

export default withRouter(connect(mapStateToProps)(Register));
