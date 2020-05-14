import { FEATCH_USERS_FAILURE, FEATCH_USERS_REQUEST, FEATCH_USERS_SUCCESS } from './userTypes';

const initialState = {
    loading: false,
    users: [],
    error: ''
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case FEATCH_USERS_REQUEST:
            return {
                ...state,
                loading: true
            }
        case FEATCH_USERS_SUCCESS:
            return {
                ...state,
                loading: false,
                users: action.payload,
                error: ''
            }
        case FEATCH_USERS_FAILURE:
            return {
                ...state,
                loading: false,
                users: [],
                error: action.payload
            }
        default:
            return state;
    }
}

export default reducer;