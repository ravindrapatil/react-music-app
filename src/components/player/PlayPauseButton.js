import React from 'react';
import { IconButton, CircularProgress } from "@material-ui/core/";
import {
    PauseCircleFilled,
    PlayCircleFilled,
    Pause,
    PlayArrow
} from "@material-ui/icons/";

function PlayPauseButton({ audioState, player, minimized }) {

    const togglePlayPause = (e) => {
        if (audioState === 'playing') {
            player.pause()
        } else if (audioState === 'paused') {
            player.play()
        }
        e.stopPropagation();
    }

    const showPlayPauseIcons = () => {
        if (audioState === 'playing') {
            if(minimized) {
                return <Pause style={{fontSize: '3rem', opacity: ".8", color: '#fff'}} />    
            }
            return <PauseCircleFilled color="primary" style={{fontSize: '4rem'}} />
        } else if (audioState === 'paused' || audioState === 'loaded') {
            if(minimized) { 
                return <PlayArrow style={{fontSize: '3rem', opacity: ".8", color: '#fff'}} />
            }
            return <PlayCircleFilled color="primary" style={{fontSize: '4rem'}} />
        } else if (audioState === 'loading') {
            return <CircularProgress />
        }
    }

    return (
        <IconButton
            size="small"
            onClick={togglePlayPause}
        >
            {showPlayPauseIcons()}
        </IconButton>
    )
}

export default PlayPauseButton
