export const saveCode = (payload) => {
    return async dispatch => {
        dispatch({
            type: 'SAVE_CODE',
            payload
        })
    }
}