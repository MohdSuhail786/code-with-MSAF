import { useContext } from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  Col,
  Row,
  Progress,
  Button,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
} from "reactstrap";
import AppContext from "../../../../context/AppContext.jsx";
import { getUserData, setUserData } from "../../../../utils/index.js";
import Widget from "../../components/Widget/Widget.js";
import { updateUserProfile } from "../login/store/action/index.js";
import {updateProfile} from "./store/action/index.js";

export default function EditProfile() {
    const history = useHistory()
    const dispatch = useDispatch()
    const user = getUserData()
    const appContext = useContext(AppContext)
    const [state,setState] = useState({name:user.name,email:user.email,mobile:user.mobile,collegeName:user.collegeName})
    const handleCancel = () => {
        history.push('/dashboard')
    };
    const handleSubmit = async () => {
        const response = await updateProfile(state)
        if(response.status){
            console.log(response.data)
            dispatch(updateUserProfile(response.data))
            setUserData(response.data.user,response.data.accessToken,response.data.refreshToken)
            return appContext.showSnackbar({message:response.message,severity:'success'})
        }
        return appContext.showSnackbar({message:response.message,severity:'error'})
    };
    const handleReset = () => {
        setState({name:user.name,email:user.email,mobile:user.mobile,collegeName:user.collegeName})
    }
  return (
    <>
      <Row>
        <h2 class="page-title">User</h2>
        <Col>
          <Widget className="widget-p-md">
            <div class="headline-2 mb-4">Edit My Profile</div>
            <form>
              <div className="form-group">
                <label className="col-form-label null " htmlFor="firstName">
                  Name
                </label>
                <input
                  id="firstName"
                  type="text"
                  className="form-control  "
                  value={state.name}
                  onChange={(event)=>{setState({...state,name:event.target.value})}}
                />
                <div className="invalid-feedback" />
              </div>
              <div className="form-group">
                <label className="col-form-label null " htmlFor="email">
                  E-mail
                </label>
                <input
                  id="email"
                  type="text"
                  className="form-control  "
                  disabled={true}
                  value={user.email}
                />
                <div className="invalid-feedback" />
              </div>
              <div className="form-group">
                <label className="col-form-label null " htmlFor="phoneNumber">
                  Phone Number
                </label>
                <input
                  id="phoneNumber"
                  type="text"
                  className="form-control  "
                  value={state.mobile}
                  onChange={(event)=>{setState({...state,mobile:event.target.value})}}
                />
                <div className="invalid-feedback" />
              </div>
              <div className="form-group">
                <label className="col-form-label null " htmlFor="collegeName">
                  College Name
                </label>
                <input
                  id="collegeName"
                  type="text"
                  className="form-control  "
                  disabled={user.role === 'organization'}
                  value={state.collegeName}
                  onChange={(event)=>{setState({...state,collegeName:event.target.value})}}
                />
                <div className="invalid-feedback" />
              </div>
              {/* <div className="form-group">
                <label className="col-form-label null" htmlFor="avatar">
                  Avatar
                </label>
                <br />
                <div className="sc-bdnxRM jvCTkj">
                  <label
                    className="btn btn-outline-secondary px-4 mb-2"
                    style={{ cursor: "pointer" }}
                  >
                    Upload an image
                    <input
                      accept="image/*"
                      type="file"
                      style={{ display: "none" }}
                    />
                  </label>
                </div>
                <div className="invalid-feedback" />
              </div> */}
              <div className="form-buttons">
                <button className="mr-3 btn btn-primary" type="button" onClick={handleSubmit}>
                  Save
                </button>{" "}
                <button className="mr-3 btn btn-secondary" type="button" onClick={handleReset}>
                  Reset
                </button>{" "}
                <button className="mr-3 btn btn-secondary" type="button" onClick={handleCancel}>
                  Cancel
                </button>
              </div>
            </form>
          </Widget>
        </Col>
      </Row>
    </>
  );
}
