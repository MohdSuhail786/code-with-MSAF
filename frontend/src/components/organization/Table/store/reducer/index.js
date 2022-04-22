const initialState = {
    response: {
        data: null,
        status:null,
       
    }
}

const codingQuestionReducer = (state = initialState,action) => {
    switch (action.type) {
        case 'GETQUESTIONS':
            return {...state,response:action.data}
        default:
            return state
    }
}

export default codingQuestionReducer;