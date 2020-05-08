import React, { useEffect, Fragment } from 'react';
import { withRouter } from 'react-router-dom';

function ScrollToTop({ history, children }) {

    useEffect(() => {
        const unlisten = history.listen(() => {
            console.log('path changed....');
            window.scrollTo(0, 0);
        });
        return () => {
            unlisten();
        }
    },[history]);

    return <Fragment>{children}</Fragment>
}

export default withRouter(ScrollToTop)
