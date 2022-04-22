import { useContext } from "react";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import {
  Col,
  Row,
} from "reactstrap";
import Widget from "../../components/Widget/Widget.js";
import AppContext from "../../../../context/AppContext.jsx";
import {changeUserPassword} from "./store/action/index"

export default function ChangePassword() {
    const [state,setState] = useState({current:'',new:'',confirm:''})
    const history = useHistory()
    const appContext = useContext(AppContext)
    const handleChangePassword = async () => {
        if(state.new !== state.confirm) {
          return appContext.showSnackbar({message:"Passwords do not match.",severity:'warning'})
        }
        const response = await changeUserPassword({oldPassword:state.current,newPassword:state.new})
        if(response.status) {
          setState({current:'',new:'',confirm:''})
          return appContext.showSnackbar({message:"Password changes successfully",severity:'success'})
        }
        appContext.showSnackbar({message:response.data,severity:'error'})
    }
    const handleCancel = () => {
        history.push('/dashboard')
    }  
    
  return (
    <>
      <Row>
        <h2 class="page-title">User</h2>
        <Col>
          <Widget className="widget-p-md">
            <div class="headline-2 mb-4">Change password</div>
            <form>
              <div className="form-group">
                <label
                  className="col-form-label null "
                  htmlFor="currentPassword"
                >
                  Current Password
                </label>
                <input
                  id="currentPassword"
                  type="password"
                  className="form-control  "
                  value={state.current}
                  onChange={(e)=>setState({...state,current:e.target.value})}
                />
                <div className="invalid-feedback" />
              </div>
              <div className="form-group">
                <label className="col-form-label null " htmlFor="newPassword">
                  New Password
                </label>
                <input
                  id="newPassword"
                  type="password"
                  className="form-control  "
                  value={state.new}
                  onChange={(e)=>setState({...state,new:e.target.value})}
                />
                <div className="invalid-feedback" />
              </div>
              <div className="form-group">
                <label
                  className="col-form-label null "
                  htmlFor="confirmNewPassword"
                >
                  Confirm new Password
                </label>
                <input
                  id="confirmNewPassword"
                  type="password"
                  className="form-control  "
                  value={state.confirm}
                  onChange={(e)=>setState({...state,confirm:e.target.value})}
                />
                <div className="invalid-feedback" />
              </div>
              <div>
                <button className="btn btn-primary mr-3" onClick={handleChangePassword} type="button">
                  Change Password
                </button>
                <button className="btn btn-secondary" onClick={handleCancel} type="button">
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
