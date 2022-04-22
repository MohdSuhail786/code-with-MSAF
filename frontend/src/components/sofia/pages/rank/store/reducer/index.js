const initialState = {
    list:[],
    students:[]
}

const standingReducer = (state = initialState,action) => {
    switch(action.type) {
        case 'SAVE_STANDINGS':
            return {...state,list:action.payload}
        case 'SAVE_STUDENTS_BY_INSTITUTE':
            return {...state,students:action.payload}
        default:
            return state
    }
}

export default standingReducer