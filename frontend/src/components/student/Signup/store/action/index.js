import { fetchData } from "../../../../../middleware/RequestHandler"

export const signup = async (cred) => {
   try {
    const res = await fetchData('/user',{
        body: JSON.stringify(cred),
        method: 'POST'
    })
    return res
   } catch (err) {
       throw err
   }
}

export const signupInstitute = async (cred) => {
    try {
     const res = await fetchData('/org/user',{
         body: JSON.stringify(cred),
         method: 'POST'
     })
     return res
    } catch (err) {
        throw err
    }
 }