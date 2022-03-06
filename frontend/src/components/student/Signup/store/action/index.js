import { fetchData } from "../../../../../middleware/RequestHandler"

export const signup = (cred) => {
    return async dispatch => {
        const res = await fetchData('/user',{
            body: JSON.stringify(cred),
            method: 'POST'
        })
        dispatch({
            type: 'SIGNUP',
            data: res
        })
    }
}