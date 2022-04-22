const initialState = {list:[]}

const saveTopPerformersReducer = (state = initialState,action) => {
    switch(action.type) {
        case 'SAVE_TOP_PERFORMERS':
            return {list:action.payload}
        default:
            return state
    }
}

export default saveTopPerformersReducer