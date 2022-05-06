const initialState = {
    questions:[],
    submissions:[]
}

const saveEventReducer = (state = initialState,action) => {
    switch(action.type) {
        case 'SAVE_EVENT_DETAILS':
            return action.payload
        default:
            return state
    }
}

export default saveEventReducer