import {combineReducers} from 'redux'
import auth from '../../components/student/Login/store/reducer'
import code from '../../components/utilityComponent/CodeEditor/store/reducer'
import result from '../../components/utilityComponent/Problem/store/reducer'
import progressBar from '../../components/utilityComponent/CircularProgress/store/reducer'
import topPerformers from '../../components/utilityComponent/HomeTopPerformer/store/reducer'
import problemOfTheDay from '../../components/utilityComponent/HomeDailyProblem/store/reducer'
import sidebar from '../../components/sofia/components/Sidebar/store/reducer'
import userDetails from '../../components/sofia/pages/dashboard/store/reducer'
import heatmap from '../../components/sofia/pages/uielements/charts/components/store/reducer'
import standing from '../../components/sofia/pages/rank/store/reducer'
const rootReducer = combineReducers({
    auth,
    code,
    result,
    progressBar,
    topPerformers,
    problemOfTheDay,
    sidebar,
    heatmap,
    userDetails,
    standing,
})

export default rootReducer