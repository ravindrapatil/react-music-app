import axios from 'axios';
import { FEATCH_USERS_FAILURE, FEATCH_USERS_REQUEST, FEATCH_USERS_SUCCESS } from './userTypes';

// These all are action creater 

export const fetchUsersRequest = () => {
    return {
        type: FEATCH_USERS_REQUEST
    }
}

export const fetchUsersSuccess = (users) => {
    return {
        type: FEATCH_USERS_SUCCESS,
        payload: users
    }
}

export const fetchUsersFailure = (error) => {
    return {
        type: FEATCH_USERS_FAILURE,
        payload: error
    }
}

// All the above action creater return object 
// This action creater is special. By making use of thunk middleware, 'fetchUsers' will instead return another function.
// It dosen't have tobe pure function. It allows sideeffects such as async API calls.
// This function also receives the 'dispatch' method as its argument 

export const fetchUsers = () => {
    debugger;
    return (dispatch) => {
        dispatch(fetchUsersRequest);
        axios.get('https://jsonplaceholder.typicode.com/users')
            .then(res => {
                const users = res.data;
                dispatch(fetchUsersSuccess(users));
            })
            .catch(err => {
                const error = err.message;
                dispatch(fetchUsersFailure(error));
            })
    }
}