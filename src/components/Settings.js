import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCricketPlayers } from '../appRedux';

function Settings() {
    const cricPlayers = useSelector(state => state.cricketPlayers)
    console.log('Indian cricket team ', cricPlayers.players);
    const dispatch = useDispatch();

    return (
        <div>
            <button onClick={() => dispatch(fetchCricketPlayers())}>API Call</button>
        </div>
    )
}

export default Settings
