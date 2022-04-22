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
        case 'UPDATE_PROFILE':
            console.log("Update profile reducer")
            return {...state,auth:{...state.auth,data:{...state.auth.data,user:action.user,accessToken:action.accessToken,refreshToken:action.refreshToken}}}
        default:
            return state
    }
}

export default loginReducer