import { combineReducers } from 'redux';
import userReducer from './users/userReducer';
import squardReducer from './fantasySquad/squardReducer';
import stocksReducer from './stocks/stocksReducers';
import shippingOrderReducer from './shippingOrder/orderReducer'

const rootReducer = combineReducers({
    user: userReducer,
    cricketPlayers: squardReducer,
    stocks: stocksReducer,
    shippingOrder: shippingOrderReducer
})

export default rootReducer