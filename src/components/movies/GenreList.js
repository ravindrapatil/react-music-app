import React from 'react';
import Chip from '@material-ui/core/Chip';

function GenreList({ genres, moviegenre }) {
    let genresList;
    if (moviegenre) {
        genresList = moviegenre.map(a => {
            return a[0].name
        })
    }

    const genreListForMovies = genres && genres.length && genres.map((gener, index) => {
        return <span key={index} title={gener.name}>{gener.name}, </span>
    })

    const genreListForMoviesDetails = genresList && genresList.length && genresList.map((gener, index) => {
        return <Chip key={index} style={{marginRight: '10px', padding: '0 10px', fontSize: '12px'}} color="primary" size="small" label={gener} />
    })

    return (
        <>
            {
                genres ? genreListForMovies : genreListForMoviesDetails
            }
        </>
    )
}

export default GenreList
