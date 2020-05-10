import React, { useEffect, useState } from 'react';
import {
    Grid,
    makeStyles,
    Typography
} from '@material-ui/core/';

import themoviedb from '../../apis/themoviedb';
import GenreList from './GenreList';
import MoviesGallery from './MoviesGallery';
import CastAndCrewComponent from './CastAndCrew';
import MovieCard from './MovieCard';
import { formatMoney, formatTime, genresList } from '../../utilities/utilities';
import defaultImg from '../../images/default-movie.jpg';

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

function MovieFullView(props) {
    const classes = useStyles();
    const movieId = props.match.params.id;
    const [movie, setMovie] = useState({});
    const [movieImages, setMovieImages] = useState();
    const [castAndCrew, setCastAndCrew] = useState();
    const [recommendedMoviesList, setRecommendedMoviesList] = useState();
    let revenue, budget, runtime, moviegenre;

    const getMovieDetails = async (id) => {
        const result = await themoviedb.getMovieDetails(id);
        if (result) {
            setMovie(result.data);
        }
    }

    const getMovieImages = async (id) => {
        const imagesResult = await themoviedb.getImages(id);
        if (imagesResult) {
            let posters = imagesResult.data.posters
            posters.length = 10;
            setMovieImages(posters);
        }
    }

    const getCastAndCrew = async (id) => {
        const credits = await themoviedb.getCredits(id);
        if (credits) {
            const castcrew = credits.data.cast;
            if (credits.data.cast.length > 10) {
                castcrew.length = 40;
            }
            // castcrew.length = 40;
            setCastAndCrew(castcrew);
        }
    }

    const getRecommendedMovies = async (id) => {
        const recommendations = await themoviedb.getRecommendations(id);
        if (recommendations) {
            const recMovies = recommendations;
            setRecommendedMoviesList(recMovies);
        }
    }

    useEffect(() => {
        getMovieDetails(movieId);
        getMovieImages(movieId);
        getCastAndCrew(movieId);
        getRecommendedMovies(movieId)
    }, [movieId])

    if (Object.keys(movie).length !== 0) {
        revenue = formatMoney(movie.revenue);
        budget = formatMoney(movie.budget);
        runtime = formatTime(movie.runtime);
        moviegenre = genresList(movie.genres);
    }

    return (
        <>
            <div style={{ marginTop: '30px' }}>
                {   
                    movie && <Grid container spacing={3}>
                        <Grid item xs={12} md={3} lg={3} sm={3}>
                            <img className={classes.imgStyle}
                                src={movie.poster_path ? `https://image.tmdb.org/t/p/w300///${movie.poster_path}` : `${defaultImg}`}
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
                                {moviegenre && <GenreList moviegenre={moviegenre} />}
                            </div>

                        </Grid>
                    </Grid>
                }
            </div>
            <div>
                <MoviesGallery movieImages={movieImages} />
            </div>
            <div>
                <CastAndCrewComponent castAndCrew={castAndCrew} />
            </div>
            {
                recommendedMoviesList &&
                <>
                    <Typography variant="h5" gutterBottom>RECOMMENDATIONS</Typography>
                    <MovieCard movies={recommendedMoviesList} />
                </>
            }
        </>
    )
}

export default MovieFullView
