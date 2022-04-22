import { fetchData } from '../../../../../../middleware/RequestHandler'

export const fetchStandings = (cred) => {
    return async dispatch => {
        const res = await fetchData('/standings',{
            method: 'GET'
        })
        dispatch({
            type: 'SAVE_STANDINGS',
            payload: res.data
        })
    }
}

export const fetchStudentsByInstitute = (cred) => {
    return async dispatch => {
        const res = await fetchData('/institute/students',{
            method: 'GET'
        })
        dispatch({
            type: 'SAVE_STUDENTS_BY_INSTITUTE',
            payload: res.data
        })
    }
}

export const blockUser = async (id) => {
    const res = await fetchData('/block-user/'+id,{
        method: 'PUT'
    })
    return res
}

export const unBlockkUser = async (id) => {
    const res = await fetchData('/unblock-user/'+id,{
        method: 'PUT'
    })
    return res
}