import React from 'react';
import { IconButton } from "@material-ui/core/";
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';

function PreviousButton({ playPreviousSong }) {
    return (
        <IconButton color='primary' aria-label="Next" onClick={playPreviousSong}>
            <SkipPreviousIcon />
        </IconButton>
    )
}

export default PreviousButton
