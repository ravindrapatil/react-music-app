import React from 'react'
import {
    makeStyles
} from '@material-ui/core/';

const useStyle = makeStyles(() => ({
    PleaseWaitText: {
        textAlign: 'center',
        color: '#000'
    }
}))

function AppLoader() {
    const classes = useStyle();
    return (
        <div>
            <div className={classes.PleaseWaitText}>Please wait ...</div>
        </div>
    )
}

export default AppLoader
