const initialState = {
}

const saveCodeReducer = (state = initialState,action) => {
    switch(action.type) {
        case 'SAVE_CODE':
            return {...state,[action.payload.problem_code]:action.payload.code}
        default:
            return state
    }
}

export default saveCodeReducer