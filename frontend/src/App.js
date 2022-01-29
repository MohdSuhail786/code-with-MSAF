import {
  BrowserRouter as Router,
  useRoutes,
} from "react-router-dom";
import CodeEditor from "./Components/CodeEditor/CodeEditor";
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
