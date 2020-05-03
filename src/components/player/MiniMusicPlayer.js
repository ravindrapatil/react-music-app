import React from 'react'
import {
    Container,
    Typography
} from '@material-ui/core';
import "../../styles/MiniMusicStyle.css";

import PlayPauseButton from './PlayPauseButton';

import CloseIcon from '@material-ui/icons/Close';
import SkipNextIcon from '@material-ui/icons/SkipNext';

function MiniMusicPlayer({ emptyPlayer, data, playNext, playPause }) {

    const getThumbnail = () => {
        if(data.thumbnail) {
            return window.URL.createObjectURL(data.thumbnail);
        } else {
            return data.sdThumbnail
        }
    }

    return (
        <Container>
            <div className={"mainContainer"}>
                <div className={"overflow-hidden"}>
                    <div className="details">
                        <Typography variant="body1">{data.title}</Typography>
                        <Typography variant="body2">{data.channelTitle}</Typography>
                    </div>
                    <div className="buttons">
                        <SkipNextIcon onClick = {playNext} />
                        <CloseIcon onClick = {emptyPlayer} />
                    </div>
                    <div className={"miniArtContainer"}>
                        <div className={"mainArt"}>
                            <img
                                className={"miniArtImg"}
                                src={getThumbnail()}
                                alt="music art"
                            />
                            <PlayPauseButton
                                player={playPause.player}
                                minimized={playPause.minimized}
                                audioState={playPause.audioState}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </Container>
    )
}

export default MiniMusicPlayer
