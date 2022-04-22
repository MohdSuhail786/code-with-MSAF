import { fetchData } from '../../../../../../../../middleware/RequestHandler'

export const getHeatMap = () => {
    return async dispatch => {
        const res = await fetchData('/heat-map',{
            method: 'GET'
        })
        dispatch({
            type: 'HEAT_MAP',
            labels: res.labels,
            solved: res.solved,
            attempted: res.attempted
        })
    }
}