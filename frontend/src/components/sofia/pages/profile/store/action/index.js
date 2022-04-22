import { fetchData } from "../../../../../../middleware/RequestHandler"

export const changeUserPassword = async (payload) => {
    const res = await fetchData('/change-password',{
        body:JSON.stringify(payload),
        method: 'POST'
    })
    return res    
}

export const updateProfile = async (payload) => {
    const res = await fetchData('/update-profile',{
        body:JSON.stringify(payload),
        method: 'POST'
        })
    return res
}

export const askQuery = async (payload) => {
    const res = await fetchData('/ask-query',{
        body:JSON.stringify(payload),
        method: 'POST'
        })
    return res
}