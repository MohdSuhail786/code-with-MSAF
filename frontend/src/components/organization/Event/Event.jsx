import logo from "../../../assets/images/logo.png";
import { ReactComponent as Register } from "../../../assets/images/login-v2.svg";
import { useDispatch, useSelector } from "react-redux";
import { login } from "./store/action/index";
import { useContext, useEffect, useState } from "react";
import AppContext from "../../../context/AppContext";
import { setUserData } from "../../../utils";
import TextField from "@mui/material/TextField";
import DateAndTimePicker from "../../utilityComponent/DateAndTimePicker/DateAndTimePicker";
import DataTable from "../Table/Table";
import './Event.css'
function Event() {
  const [state, setState] = useState({
    event_name: "",
    begin_time: "",
    end_time: "",
    questions: [],
    event_organizer: "",
  });
  const dispatch = useDispatch();
  const appContext = useContext(AppContext);
  const store = useSelector((state) => state.auth);
  const handleTimeAndDate = (time,name)=>{
     if(name=="beginTimeAndDate"){
       setState({...state,begin_time:time})
     }
     if(name=="endTimeAndDate"){

      if(state.begin_time=="" || state.begin_time >= time){
        console.log("please filee valid date and time");
      }
      setState({...state,end_time:time})

     }
  }

  const addEventQuestion = (id)=>{
   setState({...state,questions:[...state.questions,id]})
  }
  useEffect(()=>{
     console.log(state)
  },[state])

  return (
    <>
    <div className="eventWrapper">
      <h2>Add Event</h2>
      <TextField fullWidth label="Name Of event" id="fullWidth" onChange={(e)=>setState({...state,event_name:e.target.value})}/>
      <DateAndTimePicker eventTime="Begin Time & Date of event" handleTimeAndDate={handleTimeAndDate} name={"beginTimeAndDate"}/>
      <DateAndTimePicker eventTime="End Time & Date of event" handleTimeAndDate={handleTimeAndDate} name={"endTimeAndDate"}/>
      <button>Add Questions</button>
      <DataTable addEventQuestion={addEventQuestion}/>
      </div>
    </>
  );
}

export default Event;
