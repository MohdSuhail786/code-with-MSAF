const loginReducer = (state = false,action) => {
    switch(action.type) {
        case 'SHOW_PROGRESS_BAR':
            return true
        case 'HIDE_PROGRESS_BAR':
            return false
        default:
            return state
    }
}

export default loginReducer