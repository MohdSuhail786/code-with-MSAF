import { BrowserRouter as Router, Route, Redirect, Switch } from "react-router-dom";
import { adminHomeRoute, adminLoginRoute, organizationHomeRoute, organizationLoginRoute, organizationRegisterRoute, problemWithCode, problemwithcode, role, studentHomeRoute, studentLoginRoute, studentRegisterRoute, studentSettingRoute, STUDENT_TEMPLATE_ROUTE } from "../config";
import { getHomeRouteForLoggedInUser, isUserLoggedIn } from "../utils";
import Problem from "../components/utilityComponent/Problem/Problem";
import OrgDashboard from "../components/organization/Dashboard/Dashboard"
import AdminDashboard from "../components/admin/Dashboard/Dashboard"
import StudentDashboardLayout from "../components/student/DashboardLayout/DashboardLayout"
import OrganizationDashboardLayout from "../components/student/DashboardLayout/DashboardLayout"
import AdminLogin from "../components/admin/Login/Login"
import StudentLogin from "../components/student/Login/Login"
import OrgLogin from "../components/organization/Login/Login"
import StudentSignup from "../components/student/Signup/Signup"
import OrgSignup from "../components/organization/Signup/Signup"
import StudentHome from "../components/student/Home/Home"
import StudentSetting from "../components/student/Setting/Setting"
import StudentTemplate from "../components/student/Template/Template"
import Home from "../components/utilityComponent/Home/Home";
import { useContext } from "react";
import AppContext from "../context/AppContext";
import Practice from "../components/utilityComponent/Practice/Practice";
import Ratings from "../components/utilityComponent/Ratings/Ratings";
import Contest from "../components/utilityComponent/Contest/Contest";
import VerifyAccount from "../components/utilityComponent/VerifyAccount/VerifyAccount";
import CodeEditor from "../components/utilityComponent/CodeEditor/CodeEditor";
import Login from "../components/sofia/pages/login/Login";
import Register from "../components/sofia/pages/register/Register";
import Dashboard from "../components/sofia/pages/dashboard/Dashboard";
import Layout from "../components/sofia/components/Layout/Layout";
import RegisterInstitute from "../components/sofia/pages/register/RegisterInstitute";

function AppSwitch() {
  const appContext = useContext(AppContext)

  return (
      <Router>
        {
          appContext.userRole === role.admin && 
          <Switch>
            <Route exact path={adminHomeRoute} children={<AdminDashboard />} />
          </Switch>
        }

        <Switch>
          <Route exact path={adminLoginRoute} render={()=>isUserLoggedIn() ? <Redirect to={getHomeRouteForLoggedInUser(appContext.userRole)} /> : <Login />} />
          <Route exact path={studentLoginRoute} render={()=>isUserLoggedIn() ? <Redirect to={getHomeRouteForLoggedInUser(appContext.userRole)} /> : <Login />} />
          <Route exact path={organizationLoginRoute} render={()=>isUserLoggedIn() ? <Redirect to={getHomeRouteForLoggedInUser(appContext.userRole)} /> : <Login />} />
          <Route exact path={organizationRegisterRoute} render={()=>isUserLoggedIn() ? <Redirect to={getHomeRouteForLoggedInUser(appContext.userRole)} /> : <RegisterInstitute />} />
          <Route exact path={studentRegisterRoute} render={()=>isUserLoggedIn() ? <Redirect to={getHomeRouteForLoggedInUser(appContext.userRole)} /> : <Register />} />
          <Route path='/dashboard' children={<Layout />} />
          <Route exact path='/' children={<Home />} />
          <Route exact path='/practice' children={<Practice />} />
          <Route exact path='/ratings' children={<Ratings />} />
          <Route exact path='/contest' children={<Contest />} />
          <Route exact path={problemWithCode} children={<Problem />} />
          <Route exact path='/verify-account/:id/:verificationCode' children={<VerifyAccount />} />
        </Switch>
      </Router>
  );
}
  
export default AppSwitch;