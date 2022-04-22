import { fetchData } from "../../../../../middleware/RequestHandler"

export const getProblemOfTheDay = (payload) => {
    return async dispatch => {
        const res = await fetchData('/problem-of-the-day',{
            method: 'GET'
        })
        return dispatch({
            type: 'SAVE_PROBLEM_OF_THE_DAY',
            payload: res.data
        })
    }
}