import React from 'react';
import {
    Typography, Tooltip
} from '@material-ui/core/';

function EstimatedTotal({ estimatedTotal }) {
    return (
        <div className="shippingBlock">
            <Typography variant="h5" className="left">
                Est. Total
            </Typography>
            <Typography variant="h5" className="right">
                &#8377;{estimatedTotal}
            </Typography>
        </div>
    )
}

export default EstimatedTotal
