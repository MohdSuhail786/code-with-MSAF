const initialState = {problem:{}}

const saveTopPerformersReducer = (state = initialState,action) => {
    switch(action.type) {
        case 'SAVE_PROBLEM_OF_THE_DAY':
            return {problem:action.payload}
        default:
            return state
    }
}

export default saveTopPerformersReducer