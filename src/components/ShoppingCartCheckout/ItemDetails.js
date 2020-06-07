import React, { useState } from 'react';
import {
    CardActions,
    IconButton,
    Collapse,
    CardContent,
    Tooltip,
    makeStyles
} from '@material-ui/core/';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const useStyle = makeStyles(() => ({
    expand: {
        transform: 'rotate(180deg)'
    },
    expandOpen: {
        transform: 'rotate(0deg)'
    }
}));

function ItemDetails({ estimatedTotal }) {
    const classes = useStyle();
    const [state, setstate] = useState({
        expanded: false
    });
    const { expanded } = state;
    const handleExpandClick = () => {
        setstate({
            ...state,
            expanded: !expanded
        })
    }

    return (
        <>
            <CardActions style={{ justifyContent: 'center', padding: '0 0 5px' }}>
                <Tooltip title="Item Details">
                    <IconButton
                        className={`${expanded ? [classes.expand] : [classes.expandOpen]}`}
                        onClick={handleExpandClick}>
                        <ExpandMoreIcon />
                    </IconButton>
                </Tooltip>
            </CardActions>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardContent style={{ background: '#e5e7e8', display: 'flex', paddingBottom: '12px' }}>
                    <div style={{ paddingRight: '10px' }}>
                        <img src="https://rukminim1.flixcart.com/image/416/416/k6qsn0w0/headphone/bluetooth/3/v/t/nu-republic-rebop-2-black-original-imafp4zbax8g76zt.jpeg?q=70"
                            alt="Headphone" style={{ height: '90px' }} />
                    </div>
                    <div style={{ fontSize: '13px' }}>
                        <p style={{ marginTop: 0 }}>Nu Republic Rebop 2 Bluetooth Headset  (Black, Wireless in the ear)</p>
                        <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                            <p>&#8377;{estimatedTotal}</p>
                            <p>Qty: 1</p>
                        </div>
                    </div>
                </CardContent>
            </Collapse>
        </>
    )
}

export default ItemDetails
