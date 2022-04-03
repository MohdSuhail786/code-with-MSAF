export const showProgressBar = () => {
    return dispatch => {
        dispatch({
            type: 'SHOW_PROGRESS_BAR',
        })
    }
}

export const hideProgressBar = () => {
    return dispatch => {
        dispatch({
            type: 'HIDE_PROGRESS_BAR',
        })
    }
}