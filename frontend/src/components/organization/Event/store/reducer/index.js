const initialState = {
    response: {
        data: null,
        status:null,
        auth: null
    }
}

const addEventReducer = (state = initialState,action) => {
    switch (action.type) {
        case 'ADDEVENT':
            return {...state,response:action.data}
        default:
            return state
    }
}

export default addEventReducer