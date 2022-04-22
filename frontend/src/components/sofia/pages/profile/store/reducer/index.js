const initialState = {changePassword:{status:false,message:''}}

const userProfileReducer = (state = initialState,action) => {
    switch(action.type) {
        case 'CHANGE_PASSWORD':
            return {...state,}
        default:
            return state
    }
}

export default userProfileReducer