const initialState = {state:true}

const changeSidebarState = (state = initialState,action) => {
    switch(action.type) {
        case 'OPEN_SIDEBAR':
            return {state:true}
        case 'CLOSE_SIDEBAR':
            return {state:false}
        default:
            return state
    }
}

export default changeSidebarState