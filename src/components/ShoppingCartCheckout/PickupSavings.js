import React from 'react';
import {
    Typography, Tooltip
} from '@material-ui/core/';
import InfoIcon from '@material-ui/icons/Info';

function PickupSavings({ pickupSaving }) {
    const tooltipText = "Picking up your order in the store helps cut costs, and we pass the saving on to you";

    return (
        <div className="shippingBlock">
            <Typography variant="body2" className="left">
                Pickup Savings <Tooltip title={tooltipText}><InfoIcon className="infoIcon" fontSize="small" /></Tooltip>
            </Typography>
            <Typography variant="body2" className="right" style={{color: 'red'}}>
                &#8377;{pickupSaving}
            </Typography>
        </div>
    )
}

export default PickupSavings
