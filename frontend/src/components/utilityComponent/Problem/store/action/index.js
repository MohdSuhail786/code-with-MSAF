import { fetchData } from "../../../../../middleware/RequestHandler"

export const runCode = (payload) => {
    return async dispatch => {
        console.log(payload, "SUbmit payload")
        const res = await fetchData('/code/submit',{
            body: JSON.stringify(payload),
            method: 'POST'
        })
        if(!res?.status){
            return dispatch({
                type: 'CLEAR_OUTPUT',
            })
        }
        if(res.type == null) {
            return dispatch({
                type: 'SAVE_FINAL_OUTPUT',
                payload: {data:res.data,solved:res.solved}
            })
        }
        const output = res.data.map(op => {
            if(!op?.err) return {output: op.output.split("\n"),input:op.input,status:true,opStatus:op.output == op.expectedOutput.join("\n"),expectedOutput:op.expectedOutput}
            return {error: op?.error.split("backend").splice(1),input:op.input,status:false}
        })
        
        return dispatch({
            type: 'SAVE_OUTPUT',
            payload: output
        })
    }
}