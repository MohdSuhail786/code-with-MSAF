import { useState } from "react";
import { getUserData, logout } from "../../../utils";
import "./DashboardLayout.css";
import ReactTooltip from 'react-tooltip'
import Avatar from 'react-avatar';
import { FRONT_END_ROUTE, studentHomeRoute, studentSettingRoute, STUDENT_TEMPLATE_ROUTE } from "../../../config";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const DashboardLayout = ({Children}) => {
  const location = useLocation()
  const [style, setStyle] = useState({
    sidebar: false,
    categoryDropdown: false,
    postDropdown: false,
    pluginDropdown: false,
  });

  useEffect(()=>{
    console.log(location)
  },[])

  const user = getUserData();
  console.log(Children)
  return (
    <>
    <head>
    <meta name="viewport" content="width=1024, initial-scale=1" />
    </head>
      <div className={style.sidebar ? "sidebar" : "sidebar close"}>
        <div className="logo-details">
          <i className="bx bxl-c-plus-plus"></i>
          <span className="logo_name">CodingWorm</span>
        </div>
        <ul className="nav-links">
        <li>
            <a href={FRONT_END_ROUTE}>
            <i class='bx bx-home-alt' ></i>
              <span className="link_name">Home</span>
            </a>
            <ul className="sub-menu blank">
              <li>
                <a className="link_name" href={FRONT_END_ROUTE}>
                  Home
                </a>
              </li>
            </ul>
          </li>
          <li>
            <a href={studentHomeRoute}>
              <i className="bx bx-grid-alt"></i>
              <span className="link_name">Dashboard</span>
            </a>
            <ul className="sub-menu blank">
              <li>
                <a className="link_name" href={studentHomeRoute}>
                  Dashboard
                </a>
              </li>
            </ul>
          </li>
         
          <li className={style.categoryDropdown ? "showMenu" : ""}>
            <div className="iocn-link">
              <a href="#">
              <i class='bx bx-code-curly'></i>
                <span className="link_name">Practice</span>
              </a>
              <i
                className="bx bxs-chevron-down arrow"
                onClick={() => {
                  setStyle((prev) => ({
                    ...prev,
                    categoryDropdown: !prev.categoryDropdown,
                  }));
                }}
              ></i>
            </div>
            <ul className="sub-menu">
              <li>
                <a className="link_name" href="#">
                  Practice
                </a>
              </li>
              <li>
                <a href="#">Beginner</a>
              </li>
              <li>
                <a href="#">Easy</a>
              </li>
              <li>
                <a href="#">Medium</a>
              </li>
              <li>
                <a href="#">Hard</a>
              </li>
            </ul>
          </li>
          <li className={style.postDropdown ? "showMenu" : ""}>
            <div className="iocn-link">
              <a href="#">
                <i className="bx bx-book-alt"></i>
                <span className="link_name">Topics</span>
              </a>
              <i
                className="bx bxs-chevron-down arrow"
                onClick={() => {
                  setStyle((prev) => ({
                    ...prev,
                    postDropdown: !prev.postDropdown,
                  }));
                }}
              ></i>
            </div>
            <ul className="sub-menu">
              <li>
                <a className="link_name" href="#">
                Topics
                </a>
              </li>
              <li>
                <a href="#">Arrays</a>
              </li>
              <li>
                <a href="#">Stacks</a>
              </li>
              <li>
                <a href="#">Queues</a>
              </li>
              <li>
                <a href="#">Linked Lists</a>
              </li>
            </ul>
          </li>
          <li>
            <a href="#">
            <i class='bx bxs-graduation' ></i>
              <span className="link_name">Institutions</span>
            </a>
            <ul className="sub-menu blank">
              <li>
                <a className="link_name" href="#">
                  Institutions
                </a>
              </li>
            </ul>
          </li>
          <li>
            <a href={STUDENT_TEMPLATE_ROUTE}>
            <i class='bx bx-code-alt' ></i>
              <span className="link_name">Template</span>
            </a>
            <ul className="sub-menu blank">
              <li>
                <a className="link_name" href={STUDENT_TEMPLATE_ROUTE}>
                  Template
                </a>
              </li>
            </ul>
          </li>
            <li>
            <a href="#">
            <i class='bx bx-share-alt' ></i>
              <span className="link_name">Invite</span>
            </a>
            <ul className="sub-menu blank">
              <li>
                <a className="link_name" href="#">
                  Invite
                </a>
              </li>
            </ul>
          </li>
          <li>
            <a href="#">
            <i class='bx bx-edit-alt' ></i>
              <span className="link_name">IDE</span>
            </a>
            <ul className="sub-menu blank">
              <li>
                <a className="link_name" href="#">
                  IDE
                </a>
              </li>
            </ul>
          </li>
          <li>
            <a href={studentSettingRoute}>
              <i className="bx bx-cog"></i>
              <span className="link_name">Settings</span>
            </a>
            <ul className="sub-menu blank">
              <li>
                <a className="link_name" href={studentSettingRoute}>
                  Settings
                </a>
              </li>
            </ul>
          </li>
          <li>
            <div className="profile-details">
              <div className="profile-content"></div>
              <div className="name-job">
                <div className="profile_name">{user.name}</div>
                <div className="job">{user.role.capitalize()}</div>
              </div>
              <i className="bx bx-log-out" onClick={logout}></i>
            </div>
          </li>
        </ul>
      </div>
      <section className="home-section">
        <div className="home-content pos-fixed">
          <div className="home-content">
            <i
              className="bx bx-menu"
              onClick={() => {
                setStyle((prev) => ({ ...prev, sidebar: !style.sidebar }));
              }}
            ></i>
            {/* <span className="text">Dashboard</span> */}
          </div>
          <div className="header-profile" data-tip data-for="dropdown-items" data-event='click focus'>
            <div className="name-job">
              <div className="profile_name">{user.name}</div>
              <div className="job">{user.role.capitalize()}</div>
            </div>
            <Avatar color={['#82CCD9', '#4194A6', '#E88554','#FFCC6B','#F2855C'].sample()} name={user.name} size="40" round/>
          </div>
          <ReactTooltip clickable id="dropdown-items" globalEventOff='click' place="bottom" type="success" effect="solid">
              <div className="dropdown-item-1" onClick={logout}>
                  <i className="bx bx-log-out"></i>
                  <span>Logout</span>
              </div>
          </ReactTooltip>
        </div>
        <div style={{marginTop: 60,paddingTop:10}}>
        {Children()}
        </div>
      </section>
    </>
  );
};

export default DashboardLayout;
