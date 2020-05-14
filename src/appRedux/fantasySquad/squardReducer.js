import { FETCH_FANTASYSQUARD_REQUEST, FETCH_FANTASYSQUARD_SUCCESS, FETCH_FANTASYSQUARD_FAILURE } from './squardTypes';

const initialData = {
    loading: false,
    players: [],
    error: ''
}

const reducer = (state = initialData, action) => {
    switch (action.type) {
        case FETCH_FANTASYSQUARD_REQUEST:
            return {
                ...state,
                loading: true
            }
        case FETCH_FANTASYSQUARD_SUCCESS:
            return {
                ...state,
                loading: false,
                players: action.payload,
                error: ''
            }
        case FETCH_FANTASYSQUARD_FAILURE:
            return {
                ...state,
                loading: false,
                players: [],
                error: action.payload
            }
        default:
            return state
    }
}

export default reducer