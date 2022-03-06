import AppRoutes from "./routes/Routes";
import Alert from "./components/utilityComponent/Alert/Alert";
import AppContext from "./context/AppContext";
import useSnackbar from "./components/utilityComponent/customHooks/useSnackbar";
import useAuth from "./components/utilityComponent/customHooks/useAuth";
import {store} from "./redux/storeConfig/store"
import {Provider} from 'react-redux'
import "./App.css"
import { withRouter } from "react-router-dom";


function App() {
  const {snackbar,showSnackbar,closeSnackbar} = useSnackbar()
  const {userRole,setUserRole} = useAuth()

  return (
    <Provider store = {store}>
      <AppContext.Provider value={{showSnackbar,userRole,setUserRole}}>  
        <Alert {...snackbar} onClose={closeSnackbar}/>
        <AppRoutes />
      </AppContext.Provider>
    </Provider>
  );
}

export default App;
