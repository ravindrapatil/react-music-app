import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchUsers } from '../appRedux';

function History({ fetchUsers, userData }) {
    debugger;
    useEffect(() => {
        fetchUsers();
    }, []);

    return (
        <div>
            <h2>List of Users</h2>
            <div>
                {
                    userData.loading ?
                        <div>Loading...</div>
                        :
                        userData.error ? <div>{userData.error}</div>
                            :
                            <div>
                                {
                                    userData.users.map((user, index) => {
                                        return <p key={index}>{user.name}</p>
                                    })
                                }
                            </div>
                }

            </div>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        userData: state.user
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchUsers: () => dispatch(fetchUsers())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(History)

// How this Section of Application works 

// Fetches a list of data from an API end point and stores in the redux stores

//  State: {loading: true, data: [], error: ''}
// loading: Display a loading spinner in our component
// data: List of users / data
// error: Displaying error to the user if API fails for some reason 

// Actions: FEATCH_USERS_REQUEST - Featch list of users, 
// FEATCH_USERS_SUCCESS - Featched successfully, 
// FEATCH_USERS_FAILURE - Error featching the data 

// Reducers: 
// case: FEATCH_USERS_REQUEST - { loading: true }
// case: FEATCH_USERS_SUCCESS - { loading: false, users/data: data(from API) }
// case: FEATCH_USERS_FAILURE - { loading: false, error: error(from API) }
