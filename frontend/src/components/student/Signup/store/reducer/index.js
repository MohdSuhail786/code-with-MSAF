const initialState = {
    response: {
        data: null,
        status:null,
        auth: null
    }
}

const signupReducer = (state = initialState,action) => {
    switch (action.type) {
        case 'SIGNUP':
            return {...state,response:action.data}
        default:
            return state
    }
}

export default signupReducer