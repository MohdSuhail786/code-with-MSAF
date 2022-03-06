import { fetchData } from '../../../../../middleware/RequestHandler'

export const login = (cred) => {
    return async dispatch => {
        const res = await fetchData('/login',{
            body: JSON.stringify(cred),
            method: 'POST'
        })
        dispatch({
            type: 'LOGIN',
            auth: res
        })
    }
}