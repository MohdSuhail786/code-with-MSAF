const initialState = {
    auth: {
        data:{
            user:{
                role: 'unknown'
            },
            accessToken: '',
            refreshToken: ''
        },
        status:null,
    }
}

const loginReducer = (state = initialState,action) => {
    switch(action.type) {
        case 'LOGIN':
            return {...state,auth:action.auth}
        default:
            return state
    }
}

export default loginReducer