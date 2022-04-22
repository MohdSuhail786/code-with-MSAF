// -- React and related libs
import React from "react";
import { connect } from "react-redux";
import { Switch, Route, withRouter, Redirect } from "react-router";

// -- Third Party Libs

// -- Custom Components
import Header from "../Header/Header";
import Sidebar from "../Sidebar/Sidebar";
import Footer from "../Footer/Footer";
import Breadcrumbs from "../Breadbrumbs/Breadcrumbs";
import Dashboard from "../../pages/dashboard/Dashboard";
import Typography from "../../pages/typography/Typography";
import Notifications from "../../pages/notifications/Notifications";
import Tables from "../../pages/tables/Tables";
import Charts from "../../pages/uielements/charts/Charts";
import Icons from "../../pages/uielements/icons/IconsPage";
import Maps from "../../pages/uielements/maps/google/GoogleMapPage";

// -- Component Styles
import s from "./Layout.module.scss";
import RankList from "../../pages/rank/rank";
import InstituteStudents from "../../pages/rank/InstituteStudents";
import EditProfile from "../../pages/profile/EditProfile";
import ChangePassword from "../../pages/profile/ChangePassword";
import AskQuery from "../../pages/profile/AskQuery";
import ErrorPage from "../../pages/error/ErrorPage";
import { getUserData } from "../../../../utils";

const Layout = (props) => {
  const user = getUserData()
  return (
    <div className={s.root}>
      <div className={s.wrap}>
        <Header />
        <Sidebar />
        <main className={s.content}>
          {/* <Breadcrumbs url={"Dashboard"} /> */}
          <Switch>
            <Route path="/dashboard" exact  component={Dashboard}/>
            <Route path="/dashboard/profile" exact component={EditProfile}/>
            <Route path="/dashboard/changepassword" exact component={ChangePassword}/>
            {user.role == "organization" && <Route path="/dashboard/students" exact component={InstituteStudents}/>}
            {user.role == "organization" && <Route path="/dashboard/events" exact component={InstituteStudents}/>}
            {user.role == "organization" && <Route path="/dashboard/results" exact component={InstituteStudents}/>}
            <Route path="/dashboard/rank" exact component={RankList}/>
            <Route path="/dashboard/askquery" exact component={AskQuery}/>
            <Route path="/*" exact component={ErrorPage}/>
          </Switch>
        </main>
        <Footer />
      </div>
    </div>
  );
}


export default Layout;
