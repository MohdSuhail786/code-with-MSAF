import { useContext, useState } from "react";
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
import { getUserData } from "../../../../utils/index.js";
  import Widget from "../../components/Widget/Widget.js";
import { askQuery } from "./store/action/index.js";
  
  export default function AskQuery() {
    const user = getUserData()
    const history = useHistory()
    const appContext = useContext(AppContext)
    const [state,setState] = useState({query:''})

    const handleSubmit = async () => {
      const response = await askQuery(state)
      let severity = "error"
      if(response.status){
        severity="success"
        setState({query:''})
      }
      appContext.showSnackbar({message:response.data,severity})
    }

    return (
      <>
        <Row>
          <h2 class="page-title">Help</h2>
          <Col>
            <Widget className="widget-p-md">
              <div class="headline-2 mb-4">Ask Query</div>
              <form>
                <div className="form-group">
                  <label className="col-form-label null " htmlFor="firstName">
                    Name
                  </label>
                  <input
                    id="firstName"
                    type="text"
                    className="form-control  "
                    disabled
                    defaultValue={user.name}
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
                    disabled
                    className="form-control  "
                    defaultValue={user.email}
                  />
                  <div className="invalid-feedback" />
                </div>
                <div className="form-group">
                  <label className="col-form-label null " htmlFor="lastName">
                    Query
                  </label>
                  <textarea value={state.query} onChange={(e)=>setState({...state,query:e.target.value})} rows="4" name="text" id="default-textarea" class="form-control"></textarea>
                  <div className="invalid-feedback" />
                </div>
                
                <div className="form-buttons">
                  <button className="mr-3 btn btn-primary" type="button" onClick={handleSubmit}>
                    Submit
                  </button>
                  <button className="mr-3 btn btn-secondary" type="button" onClick={()=>setState({...state,query:''})}>
                    Reset
                  </button>
                  <button className="mr-3 btn btn-secondary" type="button" onClick={()=>history.push('/dashboard')}>
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
  