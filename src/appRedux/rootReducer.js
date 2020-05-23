import { combineReducers } from 'redux';
import userReducer from './users/userReducer';
import squardReducer from './fantasySquad/squardReducer';
import stocksReducer from './stocks/stocksReducers';

const rootReducer = combineReducers({
    user: userReducer,
    cricketPlayers: squardReducer,
    stocks: stocksReducer
})

export default rootReducer