import React from 'react';
import {
    // Container
} from '@material-ui/core';
import {
    ExpandMore
} from "@material-ui/icons/";

function PlayerTopBar({ minimizePlayer }) {
    return (
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>dd 1</div>
            <div><ExpandMore fontSize="large" color="primary" onClick={minimizePlayer} /></div>
        </div>
    )
}

export default PlayerTopBar
