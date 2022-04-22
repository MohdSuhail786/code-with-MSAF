export const openSidebar = (payload) => {
    return async dispatch => {
        return dispatch({
            type: 'OPEN_SIDEBAR',
        })
    }
}

export const closeSidebar = (payload) => {
    return async dispatch => {
        return dispatch({
            type: 'CLOSE_SIDEBAR',
        })
    }
}