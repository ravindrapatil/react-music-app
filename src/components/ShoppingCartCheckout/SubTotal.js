import React from 'react';
import {
    Typography
} from '@material-ui/core/';

function SubTotal({ total }) {
    return (
        <div className="shippingBlock">
            <Typography variant="body2" className="left">
                Subtotal
            </Typography>
            <Typography variant="body2" className="right">
                &#8377;{total}
            </Typography>
        </div>
    )
}

export default SubTotal
