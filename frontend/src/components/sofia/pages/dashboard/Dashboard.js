import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import {
  Col,
  Row,
  Progress,
  Button,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown
} from "reactstrap";
import Widget from "../../components/Widget/Widget.js";
import ApexActivityChart from "./components/ActivityChart.js";
import * as Icons from "@material-ui/icons";
import Checked from "../../assets/checked.png"
import Cancel from "../../assets/cancel.png"
import meal1 from "../../assets/dashboard/meal-1.svg";
import meal2 from "../../assets/dashboard/meal-2.svg";
import meal3 from "../../assets/dashboard/meal-3.svg";
import upgradeImage from "../../assets/dashboard/upgradeImage.svg";
import heartRed from "../../assets/dashboard/heartRed.svg";
import heartTeal from "../../assets/dashboard/heartTeal.svg";
import heartViolet from "../../assets/dashboard/heartViolet.svg";
import heartYellow from "../../assets/dashboard/heartYellow.svg";
import gymIcon from "../../assets/dashboard/gymIcon.svg";
import therapyIcon from "../../assets/dashboard/therapyIcon.svg";
import User from "../../assets/user.svg";
import statsPie from "../../assets/dashboard/statsPie.svg";

import s from "./Dashboard.module.scss";
import ApexColumnAreaChart from "../uielements/charts/components/ApexColumnAreaChart.js";
import { getUserData } from "../../../../utils/index.js";
import { Icon } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { getLanguageRecords, getQuestionCountByDifficulty, getRecentActivity, getUserRating } from "./store/action/index.js";
import { useHistory } from "react-router-dom";

const Dashboard = () => {
  const [checkboxes, setCheckboxes] = useState([true, false])
  const user = getUserData()
  const history = useHistory()
  const dispatch = useDispatch()
  const {rating,ratingColor,languageRecords,questionRecords,recentActivity} = useSelector(state => state.userDetails)
  const toggleCheckbox = (id) => {
    setCheckboxes(checkboxes => checkboxes
      .map((checkbox, index) => index === id ? !checkbox : checkbox ))
  }
  useEffect(()=>{
    dispatch(getUserRating())
    dispatch(getLanguageRecords())
    dispatch(getQuestionCountByDifficulty())
    dispatch(getRecentActivity())
  },[])
  const meals = [{icon:meal1,name:'Summer Box',date:'10 Apr',status:'Completed'}, {icon:meal2,name:'Spring Box',date:'20 Apr',status:'Up comming'}, {icon:meal3,name:'Winter Box',date:'30 Apr',status:'Up comming'}]

  return (
    <div>
      <Row>
        <Col className="pr-grid-col" xs={12} lg={8}>
          <Row className="gutter mb-4">
            <Col className="mb-4 mb-md-0" xs={12} md={6}>
              {/* <Widget className="">
                <div className="d-flex justify-content-between widget-p-md">
                  <div className="headline-3 d-flex align-items-center">Your activity</div>
                  <UncontrolledDropdown>
                    <DropdownToggle caret>
                      &nbsp; Weekly &nbsp;
                    </DropdownToggle>
                    <DropdownMenu>
                      <DropdownItem>Daily</DropdownItem>
                      <DropdownItem>Weekly</DropdownItem>
                      <DropdownItem>Monthly</DropdownItem>
                    </DropdownMenu>
                  </UncontrolledDropdown>
                </div>
                <ApexActivityChart className="pb-4"/>
              </Widget> */}
              <Widget className="widget-p-md">
                <div className="headline-2 mb-3">Heat Map</div>
                <ApexColumnAreaChart/>
              </Widget>
            </Col>
            <Col xs={12} md={6}>
              <Widget className="widget-p-md">
                <div className="d-flex justify-content-between">
                  <div className="headline-3 d-flex align-items-center">Top Events</div>
                </div>
                {meals.map((meal) =>
                  <div key={uuidv4()} className={`mt-4 ${s.widgetBlock}`}>
                    <div className={s.widgetBody}>
                      <div className="d-flex">
                        <img className="img-fluid mr-2" src={meal.icon} alt="..." />
                        <div className="d-flex flex-column">
                          <p className="body-2">{meal.name}</p>
                          <p className="body-3 muted">{meal.status}</p>
                        </div>
                      </div>
                      <div className="body-3 muted">
                        {meal.date}
                      </div>
                    </div>
                  </div>
                )}
              </Widget>
            </Col>
          </Row>
          <Row className="gutter mb-4">
            <Col xs={12}>
              <Widget className="widget-p-none">
                <div className="d-flex flex-wrap align-items-center justify-content-center">
                  <div className="d-flex flex-column align-items-center col-12 col-xl-6 p-sm-4">
                    <p className="headline-1">Confused?</p>
                    <p className="body-3">Feel free to ask any query. </p>
                    <div className="d-flex justify-content-between my-4">
                      <Button className="rounded-pill mr-3" color="primary" onClick={()=>history.push('/dashboard/askquery')}>Ask Query</Button>
                      {/* <Button className="rounded-pill body-3" outline color="dark">Try for free</Button> */}
                    </div>
                  </div>
                  <div className="d-flex justify-content-center col-12 col-xl-6">
                    <img className="p-1 img-fluid" src={upgradeImage} alt="..." />
                  </div>
                </div>
              </Widget>
            </Col>
          </Row>
        </Col>
        <Col className="mt-4 mt-lg-0 pl-grid-col" xs={12} lg={4}>
          <Widget className="widget-p-lg">
            <div className="d-flex">
              <img className={s.image} src={User} alt="..." />
              <div className={s.userInfo}>
                <p className="headline-3">{user.name}</p>
                <p className="body-3 muted">{user.email}</p>
                <div class="rating-star">
                  {new Array(rating).fill(ratingColor).map((star)=>
                  <span key={uuidv4()} style={{marginRight:2,color:'white',backgroundColor:star,padding:'2px 1px 2px 1px'}}>★</span>
                )}
                </div>
              </div>
            </div>
            <div className={s.userParams}>
              {questionRecords.map((question)=>
              <div className="d-flex flex-column">
                <p className="headline-3 text-center">{question.count} </p>
                <p className="body-3 muted">{question.level}</p>
              </div>
              )}
            </div>
            <div className={s.goals}>
              {/* <div className={s.goalsTitle}>
                <p className="headline-3">Languages Used</p>
                <UncontrolledDropdown>
                  <DropdownToggle caret>
                    &nbsp; Weekly &nbsp;
                  </DropdownToggle>
                  <DropdownMenu>
                    <DropdownItem>Daily</DropdownItem>
                    <DropdownItem>Weekly</DropdownItem>
                    <DropdownItem>Monthly</DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>
              </div> */}
              {languageRecords.map((language) => {
                return <div className="d-flex flex-column mt-3">
                <div className={s.activity}>
                  <p className="body-2">{language.name}</p>
                  <p className="body-2">{language.count}</p>
                </div>
                <Progress color={language.color} className="progress-xs" value={language.count} />
              </div>
              })}
            </div>
            <p className="headline-3">Recent Activity</p>
            {recentActivity.map(problem => <div className={`mt-3 ${s.widgetBlock}`}>
              <div className={s.widgetBody}>
                <div className="d-flex">
                  <img className="img-fluid mr-2" style={{width:'40px',height:'auto'}} src={problem.status?Checked:Cancel} alt="..." />
                    
                  <div className="d-flex flex-column">
                    <p className="body-2">{problem.name}</p>
                    <p className="body-3 muted">{problem.language}</p>
                  </div>
                </div>
                <div className="d-flex flex-column">
                  {/* {problem.time.split(",")[0]} */}
                  <p className="body-2">{problem.time.split(",")[0]}</p>
                  <p className="body-3 muted">{problem.time.split(",")[1]}</p>
                </div>
              </div>
            </div>)}
          </Widget>
        </Col>
      </Row>
    </div>
  )
}

export default Dashboard;
