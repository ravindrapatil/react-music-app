import React from 'react';
import { IconButton } from "@material-ui/core/";
import { SkipNext } from "@material-ui/icons/";

function NextButton({ playNextSong }) {
    return (
        <IconButton color='primary' aria-label="Next" onClick={playNextSong}>
            <SkipNext />
        </IconButton>
    )
}

export default NextButton
