import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchUsers, fetchCricketPlayers } from '../appRedux';

function History({ fetchUsers, userData, fetchPlayers, playersData }) {
    useEffect(() => {
        fetchUsers();
        fetchPlayers();
    }, []);

    return (
        <div style={{ display: 'flex', justifyContent: 'space-around' }}>
            <div style={{ width: '50%', textAlign: 'left' }}>
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
            <div style={{ width: '50%', textAlign: 'left' }}>
                <h2>Indian Team</h2>
                <div>
                    {
                        playersData && playersData.loading ? <div>Loading ...</div>
                            : playersData.error ? <div>playersData.error</div> :
                                <div>
                                    {
                                        playersData.players.map((player) => {
                                            return <p key={player.pid}>{player.name}</p>
                                        })
                                    }
                                </div>
                    }
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        userData: state.user,
        playersData: state.cricketPlayers
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchUsers: () => dispatch(fetchUsers()),
        fetchPlayers: () => dispatch(fetchCricketPlayers())
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
