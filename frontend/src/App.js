import logo from "./logo.svg";
import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useRoutes,
} from "react-router-dom";
import CodeEditor from "./Components/CodeEditor/CodeEditor";
// import Login from './Components/Login/Login'
// import {Header} from "./Components/Header/Header"
import MainHeader from "./Components/MainHeader/MainHeader";
import Signup from "./Components/Signup/Signup";
import Signin from "./Components/Signin/Signin";





function App() {
  const RoutingComponent = () => {
    let routes = useRoutes([
      { path: "/", element: <CodeEditor /> },
      { path: "signup", element: <Signup /> },
      { path: "signin", element: <Signin /> },
      
    ]);
    return routes;
  };
  return (
    <div className="App">

       <Router>
      <RoutingComponent />
    </Router>
    </div>
  );
}

export default App;
