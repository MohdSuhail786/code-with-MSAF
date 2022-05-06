import { fetchData } from "../../../../../middleware/RequestHandler"

export const getCurrentEvent = ({eventName}) => {
    return async dispatch => {
        const res = await fetchData(`/event?name=${eventName}`,{
            method: 'GET'
        })
        dispatch({
            type: 'SAVE_EVENT_DETAILS',
            payload: res.data
        })
    }
}