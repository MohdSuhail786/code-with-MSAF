import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect, useSelector } from 'react-redux';
import { Button} from 'reactstrap';
import { useHistory, withRouter } from 'react-router-dom';
import s from "./Sidebar.module.scss";
import LinksGroup from "./LinksGroup/LinksGroup.js";
import SofiaLogo from "../Icons/SofiaLogo.js";
import cn from "classnames";
import { getUserData } from '../../../../utils';

const Sidebar = (props) => {
  const user = getUserData()
  const sidebar = useSelector(state => state.sidebar);
  const history = useHistory()
  const [burgerSidebarOpen, setBurgerSidebarOpen] = useState(false)

  useEffect(() => {
    if (sidebar.state) {
      setBurgerSidebarOpen(true)
    } else {
      setTimeout(() => {
        setBurgerSidebarOpen(false)
      }, 0);
    }
  }, [sidebar.state])

  return (
    <nav className={cn(s.root, {[s.sidebarOpen]: burgerSidebarOpen})} >
      <header className={s.logo} style={{cursor:'pointer'}} onClick={()=>history.push("/")}>
        <SofiaLogo/>
        <span className={s.title}>CodingWorm</span>
      </header>
      <ul className={s.nav}>
        <LinksGroup
          header="Dashboard"
          isHeader
          iconName={<i className={'eva eva-home-outline'}/>}
          link="/dashboard"
          index="dashboard"
          // badge="9"
        />
        <h5 className={s.navTitle}>SETTINGS</h5>
        <LinksGroup
          header="Profile"
          isHeader
          iconName={<i className={'eva eva-person-outline'}/>}
          link="/dashboard/profile"
          index="profile"
        />
        <LinksGroup
          header="Change Password"
          isHeader
          iconName={<i className={'eva eva-edit-2-outline'}/>}
          link="/dashboard/changepassword"
          index="Change Password"
        />
        <LinksGroup
          header="Standings"
          isHeader
          iconName={<i className={'eva eva-grid-outline'}/>}
          link="/dashboard/rank"
          index="rank"
        />
        {
          user.role === 'organization' &&
          <>
          <LinksGroup
            header="Students"
            isHeader
            iconName={<i className={'eva eva-grid-outline'}/>}
            link="/dashboard/students"
            index="rank"
          />
          <LinksGroup
            header="Events"
            isHeader
            iconName={<i className={'eva eva-code-outline'}/>}
            link="/dashboard/events"
            index="events"
          />
          <LinksGroup
            header="Results"
            isHeader
            iconName={<i className={'eva eva-grid-outline'}/>}
            link="/dashboard/results"
            index="results"
          />
          </>
        }
        <LinksGroup
          header="Ask Query"
          isHeader
          iconName={<i className={'eva eva-question-mark-outline'}/>}
          link="/dashboard/askquery"
          index="Ask Query"
        />
      </ul>
    </nav>
  );
}

export default (Sidebar);
