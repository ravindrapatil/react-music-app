import React, { useState } from 'react';
import { Link } from "react-router-dom";
import {
    makeStyles
} from '@material-ui/core/';
import SaveIcon from '@material-ui/icons/Save';
import PrintIcon from '@material-ui/icons/Print';
import ShareIcon from '@material-ui/icons/Share';
import FavoriteIcon from '@material-ui/icons/Favorite';
import SpeedDial from '@material-ui/lab/SpeedDial';
import SpeedDialIcon from '@material-ui/lab/SpeedDialIcon';
import SpeedDialAction from '@material-ui/lab/SpeedDialAction';
import SportsEsportsIcon from '@material-ui/icons/SportsEsports';

const useStyles = makeStyles(() => ({
    wrapper: {
        // position: 'fixed',
        // bottom: '0',
        // right: '0'
    },
    speedDial: {
        position: 'absolute',
        '&.MuiSpeedDial-directionUp, &.MuiSpeedDial-directionLeft': {
            bottom: 80,
            right: -30,
        },
        '&.MuiSpeedDial-directionDown, &.MuiSpeedDial-directionRight': {
            top: 80,
            left: -30,
        },
    },
    speedDialStyle: {
        color: '#fff',
        backgroundColor: 'red'
    }
}));

const actions = [
    { icon: <SportsEsportsIcon className="speedDialIcon" />, name: 'PUBG Stats', link: '/pubgstats' },
    { icon: <SaveIcon className="speedDialIcon" />, name: 'Shopping Cart', link: '/shoppingCartCheckout' },
    { icon: <PrintIcon className="speedDialIcon" />, name: 'Print', link: '/' },
    { icon: <ShareIcon className="speedDialIcon" />, name: 'Share', link: '/' },
    { icon: <FavoriteIcon className="speedDialIcon" />, name: 'Like', link: '/' },
];

function SpeedDialLab() {
    const classes = useStyles();

    const [state, setstate] = useState({
        direction: 'up',
        open: false,
        hidden: false
    });
    const { direction, open, hidden } = state;

    const handleClose = () => {
        setstate({
            ...state,
            open: false
        })
    }

    const handleOpen = () => {
        setstate({
            ...state,
            open: true
        })
    }

    return (
        <div className={classes.wrapper}>
            <SpeedDial
                ariaLabel="SpeedDial SIMMUSIC"
                className={`${classes.speedDial} speedDialBtn`}
                hidden={hidden}
                icon={<SpeedDialIcon className="{classes.speedDialStyle}" />}
                onClose={handleClose}
                onOpen={handleOpen}
                open={open}
                direction={direction}
            >
                {
                    actions.map((action) => {
                        return <SpeedDialAction
                            to={action.link} 
                            key={action.name}
                            component={Link}
                            icon={action.icon}
                            tooltipTitle={action.name}
                            onClick={handleClose}
                        />
                    })
                }
            </SpeedDial>
        </div>
    )
}

export default SpeedDialLab
