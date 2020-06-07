import { PROMO_CODE } from './orderTypes';

const initialState = {
    open: false,
    value: ''
}

const shippingOrderReducer = (state = initialState, action) => {
    switch (action.type) {
        case PROMO_CODE:
            return {
                ...state,
                value: action.payload,
                open: true
            }
        default:
            return state
    }
}

export default shippingOrderReducer