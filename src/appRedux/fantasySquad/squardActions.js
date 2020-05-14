import axios from 'axios';
import { FETCH_FANTASYSQUARD_REQUEST, FETCH_FANTASYSQUARD_SUCCESS, FETCH_FANTASYSQUARD_FAILURE } from './squardTypes';

export const fetchFantasySquardRequest = () => {
    return {
        type: FETCH_FANTASYSQUARD_REQUEST
    }
}

export const fetchFantasySquardSuccess = (data) => {
    return {
        type: FETCH_FANTASYSQUARD_SUCCESS,
        payload: data
    }
}

export const fetchFantasySquardFailure = (error) => {
    return {
        type: FETCH_FANTASYSQUARD_FAILURE,
        payload: error
    }
}

export const fetchCricketPlayers = () => {
    return (dispatch) => {
        dispatch(fetchFantasySquardRequest());
        axios.get(`https://cricapi.com/api/fantasySquad?apikey=NcY6skJ8MyPSDcmgRWpo3b3Vgvn1&unique_id=1034809`)
            .then(res => {
                const data = res.data.squad[0].players;
                dispatch(fetchFantasySquardSuccess(data))
            })
            .catch(err => {
                const error = err.message;
                dispatch(fetchFantasySquardFailure(error))
            })
    }
}