import {combineReducers} from 'redux'
import auth from '../../components/student/Login/store/reducer'
import signup from '../../components/student/Signup/store/reducer'

const rootReducer = combineReducers({
    auth,
    signup,
})

export default rootReducer