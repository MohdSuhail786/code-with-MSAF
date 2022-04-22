import { fetchData } from "../../../../middleware/RequestHandler"

export const verifyUser = async (cred) => {
   try {
    const res = await fetchData('/verify-user',{
        body: JSON.stringify(cred),
        method: 'POST'
    })
    return res
   } catch (err) {
       throw err
   }
}