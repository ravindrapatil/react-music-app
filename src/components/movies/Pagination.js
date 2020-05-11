import React from 'react';
import {
    Button
} from '@material-ui/core/';

function Pagination(props) {
    const {previousPage, nextPage} = props;

    return (
        <div style={{ margin: '20px auto', textAlign: 'center' }}>
            <Button onClick={() => previousPage()} variant="outlined" size="small" color="primary">
                Previous
            </Button>
            &nbsp;&nbsp;
            <Button onClick={() => nextPage()} variant="outlined" size="small" color="primary">
                Next
            </Button>
        </div>
    )
}

export default Pagination
