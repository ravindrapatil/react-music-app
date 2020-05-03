import React, { useState, useEffect } from 'react';
import { withStyles } from '@material-ui/core/styles';
import {
    Slider,
    Typography
} from '@material-ui/core/';

const PrettoSlider = withStyles({
    root: {
        color: '#3f51b5',
        height: 8,
    },
    thumb: {
        height: 24,
        width: 24,
        backgroundColor: '#fff',
        border: '2px solid currentColor',
        marginTop: -8,
        marginLeft: -12,
        '&:focus, &:hover, &$active': {
            boxShadow: 'inherit',
        },
    },
    active: {},
    valueLabel: {
        left: 'calc(-50% + 4px)',
    },
    track: {
        height: 8,
        borderRadius: 4,
    },
    rail: {
        height: 8,
        borderRadius: 4,
    },
})(Slider);

const MiniSlider = withStyles({
    root: {
        height: 4,
        position: "relative",
        bottom: "16px",
        color: "#FFFDFD",
        padding: 0
    },
    thumb: {
        display: "none"
    },
    track: {
        height: 4,
        borderRadius: 0
    },
    rail: {
        height: 4,
        borderRadius: 0
    }
})(Slider);

const formatTime = secs => {
    let minutes = Math.floor(secs / 60);
    let seconds = Math.ceil(secs - minutes * 60);
    if (seconds < 10) seconds = `0${seconds}`;
    return `${minutes}:${seconds}`;
};

function TimelineControl({ audioState, player, minimized }) {
    const [currentTime, setCurrentTime] = useState(0);

    const handleChange = (event, newValue) => {
        player.currentTime = newValue;
        setCurrentTime(newValue);
    }

    const showDuration = () => {
        if (player) {
            if (player.duration) {
                return formatTime(player.duration)
            } else {
                return '0:00'
            }
        } else {
            return 0
        }
    }

    useEffect(() => {
        if (player) {
            setCurrentTime(player.currentTime)
        }
        // update the time of player every 800ms
        let setTimeInterval;
        if (audioState === "playing") {
            setTimeInterval = setInterval(() => {
                setCurrentTime(player.currentTime)
            }, 800);
        } else {
            clearInterval(setTimeInterval)
        }
        return () => {
            clearInterval(setTimeInterval)
        }
    }, [audioState, player]);

    if (minimized) {
        return (
            <MiniSlider value={currentTime}
                max={player ? player.duration : 0} />
        )
    } else {
        return (
            <>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography gutterBottom>{formatTime(currentTime)}</Typography>
                    <Typography gutterBottom>{showDuration()}</Typography>
                </div>
                <PrettoSlider
                    value={currentTime}
                    onChange={handleChange}
                    max={player ? player.duration : 0}
                />
            </>
        )
    }
}

export default TimelineControl
