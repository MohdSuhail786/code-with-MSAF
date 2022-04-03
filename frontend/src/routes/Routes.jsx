import { BrowserRouter as Router, Route, Redirect, Switch } from "react-router-dom";
import { adminHomeRoute, adminLoginRoute, organizationHomeRoute, organizationLoginRoute, organizationRegisterRoute, problemWithCode, problemwithcode, role, studentHomeRoute, studentLoginRoute, studentRegisterRoute, studentSettingRoute, STUDENT_TEMPLATE_ROUTE } from "../config";
import { getHomeRouteForLoggedInUser, isUserLoggedIn } from "../utils";
import Problem from "../components/utilityComponent/Problem/Problem";
import OrgDashboard from "../components/organization/Dashboard/Dashboard"
import AdminDashboard from "../components/admin/Dashboard/Dashboard"
import StudentDashboardLayout from "../components/student/DashboardLayout/DashboardLayout"
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
import CodeEditor from "../components/utilityComponent/CodeEditor/CodeEditor";

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
        {
          appContext.userRole === role.organization && 
          <Switch>
            <Route exact path={organizationHomeRoute} children={<OrgDashboard />} />
          </Switch>
        }
        {
          appContext.userRole === role.student &&
          <Switch>
            <Route exact path={studentHomeRoute} children={<StudentDashboardLayout Children={StudentHome}/>} />
            <Route exact path={studentSettingRoute} children={<StudentDashboardLayout Children={StudentSetting}/>} />
            <Route exact path={STUDENT_TEMPLATE_ROUTE} children={<StudentDashboardLayout Children={StudentTemplate}/>} />
          </Switch>
        }

        <Switch>
          <Route exact path={adminLoginRoute} render={()=>isUserLoggedIn() ? <Redirect to={getHomeRouteForLoggedInUser(appContext.userRole)} /> : <AdminLogin />} />
          <Route exact path={studentLoginRoute} render={()=>isUserLoggedIn() ? <Redirect to={getHomeRouteForLoggedInUser(appContext.userRole)} /> : <StudentLogin />} />
          <Route exact path={organizationLoginRoute} render={()=>isUserLoggedIn() ? <Redirect to={getHomeRouteForLoggedInUser(appContext.userRole)} /> : <OrgLogin />} />
          <Route exact path={organizationRegisterRoute} render={()=>isUserLoggedIn() ? <Redirect to={getHomeRouteForLoggedInUser(appContext.userRole)} /> : <OrgSignup />} />
          <Route exact path={studentRegisterRoute} render={()=>isUserLoggedIn() ? <Redirect to={getHomeRouteForLoggedInUser(appContext.userRole)} /> : <StudentSignup />} />

          <Route exact path='/' children={<Home />} />
          <Route exact path='/practice' children={<Practice />} />
          <Route exact path='/ratings' children={<Ratings />} />
          <Route exact path='/contest' children={<Contest />} />
          <Route exact path='/test' children={<CodeEditor lang={"c"} />} />
          <Route exact path={problemWithCode} children={<Problem />} />

        </Switch>
      </Router>
  );
}
  
export default AppSwitch;