import { fetchData } from "../../../../../../middleware/RequestHandler"

export const getUserRating = (payload) => {
    return async dispatch => {
        const res = await fetchData('/user-rating',{
            method: 'GET'
        })
        return dispatch({
            type: 'SAVE_USER_RATING',
            rating: res.rank,
            ratingColor: res.rankColor
        })
    }
}

export const getLanguageRecords = (payload) => {
    return async dispatch => {
        const res = await fetchData('/language-records',{
            method: 'GET'
        })
        return dispatch({
            type: 'SAVE_LANGUAGE_RECORDS',
            payload: res.data
        })
    }
}


export const getQuestionCountByDifficulty = (payload) => {
    return async dispatch => {
        const res = await fetchData('/question-by-difficulty',{
            method: 'GET'
        })
        return dispatch({
            type: 'SAVE_QUESTIONS_COUNT_BY_DIFFICULTY',
            payload: res.data
        })
    }
}

export const getRecentActivity = (payload) => {
    return async dispatch => {
        const res = await fetchData('/recent-activity',{
            method: 'GET'
        })
        return dispatch({
            type: 'SAVE_RECENT_ACTIVITY',
            payload: res.data
        })
    }
}