import { fetchData } from '../../../../../../middleware/RequestHandler'

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

export const updateUserProfile = (payload) => {
    return dispatch => {
        console.log(dispatch)
        dispatch({
            type: 'UPDATE_PROFILE',
            user: payload.user,
            accessToken: payload.accessToken,
            refreshToken: payload.refreshToken
        })
    }
}