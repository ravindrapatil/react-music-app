import React, { useEffect, useState } from 'react';
import {
    Grid,
    makeStyles,
    Typography
} from '@material-ui/core/';

import themoviedb from '../../apis/themoviedb';
import GenreList from './GenreList';
import { formatMoney, formatTime, genresList } from '../../utilities/utilities';

const useStyles = makeStyles(() => ({
    imgStyle: {
        objectFit: 'cover',
        borderRadius: '4px',
        width: '100%'
    },
    content: {
        paddingBottom: '20px'
    }
}));

// let moviegener = [
//     { id: 28, name: "Action" },
//     { id: 12, name: "Adventure" },
//     { id: 16, name: "Animation" },
//     { id: 35, name: "Comedy" },
//     { id: 80, name: "Crime" },
//     { id: 99, name: "Documentary" },
//     { id: 18, name: "Drama" },
//     { id: 10751, name: "Family" },
//     { id: 14, name: "Fantasy" },
//     { id: 36, name: "History" },
//     { id: 27, name: "Horror" },
//     { id: 10402, name: "Music" },
//     { id: 9648, name: "Mystery" },
//     { id: 10749, name: "Romance" },
//     { id: 878, name: "Science Fiction" },
//     { id: 10770, name: "TV Movie" },
//     { id: 53, name: "Thriller" },
//     { id: 10752, name: "War" },
//     { id: 37, name: "Western" }
// ]

function MovieFullView(props) {
    const classes = useStyles();
    const movieId = props.match.params.id;
    const [movie, setMovie] = useState({});
    let revenue, budget, runtime, moviegenre;

    useEffect(() => {
        getMovieDetails(movieId)
    }, [movieId])

    const getMovieDetails = async (id) => {
        const result = await themoviedb.getMovieDetails(id);
        setMovie(result.data);
    }

    

    if (Object.keys(movie).length !== 0) {
        revenue = formatMoney(movie.revenue);
        budget = formatMoney(movie.budget);
        runtime = formatTime(movie.runtime);
        moviegenre = genresList(movie.genres);
    }

    return (
        <div style={{ marginTop: '30px' }}>
            {
                movie && <Grid container spacing={3}>
                    <Grid item xs={12} md={3} lg={3} sm={3}>
                        <img className={classes.imgStyle}
                            src={`https://image.tmdb.org/t/p/w300///${movie.poster_path}`}
                            alt={movie.title}
                            title={movie.title} />
                    </Grid>
                    <Grid item xs={12} md={9} lg={9} sm={9}>
                        <div className={classes.content}>
                            <Typography variant="caption" gutterBottom>
                                Title:
                        </Typography>
                            <Typography variant="h5" gutterBottom>
                                {movie.title}
                            </Typography>
                        </div>

                        <div className={classes.content}>
                            <Typography variant="caption" gutterBottom>
                                Overview:
                        </Typography>
                            <Typography variant="body2" gutterBottom>
                                {movie.overview}
                            </Typography>
                        </div>

                        <div className={classes.content}>
                            <Typography variant="caption" gutterBottom>
                                Release date:
                        </Typography>
                            <Typography variant="body2" gutterBottom>
                                {movie.release_date}
                            </Typography>
                        </div>

                        <div className={classes.content}>
                            <Typography variant="caption" gutterBottom>
                                Budget:
                        </Typography>
                            <Typography variant="body2" gutterBottom>
                                $ {budget}
                            </Typography>
                        </div>

                        <div className={classes.content}>
                            <Typography variant="caption" gutterBottom>
                                Revenue:
                        </Typography>
                            <Typography variant="body2" gutterBottom>
                                $ {revenue}
                            </Typography>
                        </div>

                        <div className={classes.content}>
                            <Typography variant="caption" gutterBottom>
                                Duration:
                            </Typography>
                            <Typography variant="body2" gutterBottom>
                                {runtime}
                            </Typography>
                        </div>

                        <div className={classes.content}>
                            {moviegenre && <GenreList moviegenre={moviegenre} /> }
                        </div>

                    </Grid>
                </Grid>
            }
        </div>
    )
}

export default MovieFullView
