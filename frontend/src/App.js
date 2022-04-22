import AppRoutes from "./routes/Routes";
import Alert from "./components/utilityComponent/Alert/Alert";
import AppContext from "./context/AppContext";
import useSnackbar from "./components/utilityComponent/customHooks/useSnackbar";
import useAuth from "./components/utilityComponent/customHooks/useAuth";
import {store} from "./redux/storeConfig/store"
import {Provider} from 'react-redux'
import "./App.css"
import "./components/sofia/styles/app.scss"
import LoginPopup from "./components/student/LoginPopup/LoginPopup";
import useLoginPopup from "./components/utilityComponent/customHooks/useLoginPopup";


function App() {
  const {snackbar,showSnackbar,closeSnackbar} = useSnackbar()
  const {loginpopup,showLoginPopup,closeLoginPopup} = useLoginPopup();
  const {userRole,setUserRole} = useAuth()

  return (
    <Provider store = {store}>
      <AppContext.Provider value={{showSnackbar,userRole,setUserRole,showLoginPopup}}>  
        <Alert {...snackbar} onClose={closeSnackbar}/>
        <LoginPopup {...loginpopup} onClose={closeLoginPopup}/>
        <AppRoutes />
      </AppContext.Provider>
    </Provider>
  );
}

export default App;
