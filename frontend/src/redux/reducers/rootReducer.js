import {combineReducers} from 'redux'
import auth from '../../components/student/Login/store/reducer'
import signup from '../../components/student/Signup/store/reducer'
import code from '../../components/utilityComponent/CodeEditor/store/reducer'
import result from '../../components/utilityComponent/Problem/store/reducer'
import progressBar from '../../components/utilityComponent/CircularProgress/store/reducer'
import codingQuestionReducer from '../../components/organization/Table/store/reducer'


const rootReducer = combineReducers({
    auth,
    signup,
    code,
    result,
    progressBar,
    codingQuestionReducer
})

export default rootReducer