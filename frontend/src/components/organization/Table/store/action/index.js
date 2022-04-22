import { fetchData } from "../../../../../middleware/RequestHandler"

export const codingQuestions = () => {
    console.log("call function here")
    return async dispatch => {
        const res = await fetchData('/question',{
            method: 'get'
        })
        console.log(res,"table data is coming");
        dispatch({
            type: 'GETQUESTIONS',
            data: res
        })
    }
}