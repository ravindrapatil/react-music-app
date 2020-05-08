import React, { useEffect, Fragment } from 'react';
import { withRouter } from 'react-router-dom';

function ScrollToTop({ history, children }) {

    useEffect(() => {
        const unlisten = history.listen(() => {
            console.log('path changed....');
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
        return () => {
            unlisten();
        }
    },[history]);

    return <Fragment>{children}</Fragment>
}

export default withRouter(ScrollToTop)
