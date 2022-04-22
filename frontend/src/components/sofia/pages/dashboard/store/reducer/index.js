const initialState = {rating:0,ratingColor:'#F44336',languageRecords:[],questionRecords:[],recentActivity:[]}

const userDetialsReducer = (state = initialState,action) => {
    switch(action.type) {
        case 'SAVE_USER_RATING':
            return {...state,rating:action.rating,ratingColor:action.ratingColor }
        case 'SAVE_LANGUAGE_RECORDS':
            return {...state,languageRecords:action.payload}
        case 'SAVE_QUESTIONS_COUNT_BY_DIFFICULTY':
            return {...state,questionRecords:action.payload}
        case 'SAVE_RECENT_ACTIVITY':
            return {...state,recentActivity:action.payload}
        default:
            return state
    }
}

export default userDetialsReducer