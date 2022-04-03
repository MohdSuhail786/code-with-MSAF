const initialState = {output:[],finalOutput:[],type:"sample"}

const saveOutputReducer = (state = initialState,action) => {
    switch(action.type) {
        case 'SAVE_OUTPUT':
            return {output: action.payload,finalOutput:[],type:"sample",solved:false}
        case 'SAVE_FINAL_OUTPUT':
            return {output: [],finalOutput:action.payload.data,type:"hidden",solved:action.payload.solved}
        case 'CLEAR_OUTPUT':
            return {output: [],finalOutput:[],type:"sample"}
        default:
            return state
    }
}

export default saveOutputReducer