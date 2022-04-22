const initialState = {
    labels: [],
    solved:[],
    attempted:[]
}

const heatMapReducer = (state = initialState,action) => {
    switch(action.type) {
        case 'HEAT_MAP':
            return {labels:action.labels,solved:action.solved,attempted:action.attempted}
        default:
            return state
    }
}

export default heatMapReducer