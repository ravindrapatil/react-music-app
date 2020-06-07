import React from 'react';
import {
    Typography
} from '@material-ui/core/';

function TaxesFees({ taxes }) {
    return (
        <div className="shippingBlock">
            <Typography variant="body2" className="left">
                Est. taxes fees
            </Typography>
            <Typography variant="body2" className="right">
                &#8377;{taxes}
            </Typography>
        </div>
    )
}

export default TaxesFees
