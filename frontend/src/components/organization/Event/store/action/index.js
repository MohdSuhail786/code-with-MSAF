import { fetchData } from '../../../../../middleware/RequestHandler'

export const event = (cred) => {
    return async dispatch => {
        const res = await fetchData('/event',{
            body: JSON.stringify(cred),
            method: 'POST'
        })
        dispatch({
            type: 'ADDEVENT',
            auth: res
        })
    }
}