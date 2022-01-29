import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import CodeEditor from "./Components/CodeEditor/CodeEditor";
import Signup from "./Components/Signup/Signup";
import Signin from "./Components/Signin/Signin";


function App() {

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path='/' element={<CodeEditor />} />
          <Route exact path='/signup' element={<Signup />} />
          <Route exact path='/login' element={<Signin />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
