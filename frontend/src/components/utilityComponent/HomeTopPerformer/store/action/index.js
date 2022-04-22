import { fetchData } from "../../../../../middleware/RequestHandler"

export const getTopPerformers = (payload) => {
    return async dispatch => {
        const res = await fetchData('/top-performers',{
            method: 'GET'
        })
        return dispatch({
            type: 'SAVE_TOP_PERFORMERS',
            payload: res.data
        })
    }
}