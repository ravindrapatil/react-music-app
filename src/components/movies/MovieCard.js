import React from 'react';
import {
    Card,
    CardActionArea,
    CardContent,
    CardMedia,
    Typography,
    makeStyles,
    Grid,
    Badge
} from '@material-ui/core/';

import defaultImg from '../../images/default-movie.jpg';

import GenreList from './GenreList';

const useStyles = makeStyles({
    title: {
        fontWeight: 'bold',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis'
    },
    genreStyle: {
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis'
    }
});

let genresaa = [
    { id: 28, name: "Action" },
    { id: 12, name: "Adventure" },
    { id: 16, name: "Animation" },
    { id: 35, name: "Comedy" },
    { id: 80, name: "Crime" },
    { id: 99, name: "Documentary" },
    { id: 18, name: "Drama" },
    { id: 10751, name: "Family" },
    { id: 14, name: "Fantasy" },
    { id: 36, name: "History" },
    { id: 27, name: "Horror" },
    { id: 10402, name: "Music" },
    { id: 9648, name: "Mystery" },
    { id: 10749, name: "Romance" },
    { id: 878, name: "Science Fiction" },
    { id: 10770, name: "TV Movie" },
    { id: 53, name: "Thriller" },
    { id: 10752, name: "War" },
    { id: 37, name: "Western" }
]

function MovieCard({ movies }) {
    const classes = useStyles();
    return (
        <Grid container spacing={3}>
            {
                movies.map((item, index) => {
                    const genres = genresaa.filter(genre => {
                        const match = item.genre_ids.filter(genreId => genreId === genre.id);
                        return match[0] === genre.id;
                    });

                    return (
                        <Grid item xs={12} md={3} lg={2} sm={2} key={index}>
                            <Badge className="badgeStyle" anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }} badgeContent={item.vote_average} color="primary" />
                            <Card className={classes.root}>
                                <CardActionArea className={classes.cardBtn}>
                                    <CardMedia
                                        component="img"
                                        alt={item.title}
                                        height="278"
                                        image={ item.poster_path ? `https://image.tmdb.org/t/p/w185//${item.poster_path}` : `${defaultImg}`}
                                        title={item.title}
                                    />
                                    <CardContent>
                                        <Typography variant="subtitle2" gutterBottom className={classes.title} title={item.title}>
                                            {item.title}
                                        </Typography>
                                        <div className={classes.genreStyle}>
                                            {genres && <GenreList genres={genres} />}
                                        </div>
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                        </Grid>
                    )
                })
            }
        </Grid>
    )
}

export default MovieCard