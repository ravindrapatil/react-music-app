import React, { useState, useEffect } from 'react';
import {
    ButtonGroup,
    Button,
    InputBase
} from '@material-ui/core/';

function SearchMovies(props) {
    useEffect(() => {
        console.log('hiiiiiiiiiiiiii ' + props.match.params.query)
    }, [props])
    

    return (
        <div>
            dfd fdf sd fsdfsd
        </div>
    )
}

export default SearchMovies
