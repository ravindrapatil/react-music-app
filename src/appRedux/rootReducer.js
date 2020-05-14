import { combineReducers } from 'redux';
import userReducer from './users/userReducer';
import squardReducer from './fantasySquad/squardReducer';

const rootReducer = combineReducers({
    user: userReducer,
    cricketPlayers: squardReducer
})

export default rootReducer