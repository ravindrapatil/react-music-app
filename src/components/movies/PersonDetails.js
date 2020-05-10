import React, { useEffect, useState } from 'react';
import {
    Grid,
    makeStyles,
    Typography
} from '@material-ui/core/';
import themoviedb from '../../apis/themoviedb';
import MoviesGallery from './MoviesGallery';
import MovieCard from './MovieCard';

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

function PersonDetails(props) {
    const classes = useStyles();
    const id = props.match.params.id;
    const [person, setperson] = useState();
    const [peronImagesList, setPeronImagesList] = useState();
    const [personCrewList, setpersonCrewList] = useState();
    const [showHideKnownBySection, setshowHideKnownBySection] = useState(true);

    const getArtistDetails = async (id) => {
        const person = await themoviedb.getArtistDetails(id);
        setperson(person.data)
    }

    const getPersonImageList = async (id) => {
        const personImages = await themoviedb.getPersonImages(id);
        setPeronImagesList(personImages.data.profiles);
    }

    const getPersonsMovieCredits = async (id) => {
        const personCrewCredit = await themoviedb.getMovieCredits(id);
        setpersonCrewList(personCrewCredit);
        debugger;
        const showHide = personCrewCredit.data.crew.length === 0 ? false : true
        setshowHideKnownBySection(showHide);
    }

    useEffect(() => {
        getArtistDetails(id);
        getPersonImageList(id);
        getPersonsMovieCredits(id);
    }, [id]);

    console.log(person);

    return (
        <>
            <div style={{ marginTop: '30px' }}>
                {
                    person && <Grid container spacing={3}>
                        <Grid item xs={12} md={3} lg={3} sm={3}>
                            <img className={classes.imgStyle}
                                src={`https://image.tmdb.org/t/p/w300///${person.profile_path}`}
                                alt={person.name}
                                title={person.name} />
                        </Grid>
                        <Grid item xs={12} md={9} lg={9} sm={9}>
                            <>
                                <div>
                                    <div className={classes.content}>
                                        <Typography variant="h5" gutterBottom>
                                            {person.name}
                                        </Typography>
                                    </div>

                                    <div className={classes.content}>
                                        <Typography variant="caption" gutterBottom>
                                            Birthday:
                                </Typography>
                                        <Typography variant="body2" gutterBottom>
                                            {person.birthday}
                                        </Typography>
                                    </div>

                                    <div className={classes.content}>
                                        <Typography variant="caption" gutterBottom>
                                            Place of birth:
                                </Typography>
                                        <Typography variant="body2" gutterBottom>
                                            {person.place_of_birth}
                                        </Typography>
                                    </div>

                                    <div className={classes.content}>
                                        <Typography variant="caption" gutterBottom>
                                            Biography:
                                </Typography>
                                        <Typography variant="body2" gutterBottom>
                                            {person.biography}
                                        </Typography>
                                    </div>
                                </div>
                                <div>
                                    <MoviesGallery movieImages={peronImagesList} />
                                </div>
                            </>
                        </Grid>
                    </Grid>
                }
            </div>
            {
                showHideKnownBySection && personCrewList &&
                <div>
                    <Typography variant="h5" gutterBottom>KNOWN BY</Typography>
                    <MovieCard movies={personCrewList} />
                </div>
            }

        </>
    )
}

export default PersonDetails
