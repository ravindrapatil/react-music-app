import React, { useState, useEffect } from 'react';
import {
    Typography,
    Grid,
    Button
} from '@material-ui/core/';
import defaultAvatar from '../../images/default-avatar.png';
import { withRouter } from 'react-router-dom';

function CastAndCrew(props) {
    const { castAndCrew } = props;

    const initialState = {
        casts: [],
        itemsToShow: 12,
        expanded: false
    }

    const [state, setstate] = useState(initialState);
    // const [artistInfo, setArtistInfo] = useState();

    useEffect(() => {
        setstate({
            casts: castAndCrew,
            itemsToShow: 12,
            expanded: false
        })
    }, [castAndCrew, setstate])

    const { casts, itemsToShow, expanded } = state;

    const showMore = () => {
        if (itemsToShow === 12) {
            setstate({ ...state, expanded: true, itemsToShow: casts.length })
        } else {
            setstate({ ...state, expanded: false, itemsToShow: 12 })
        }
    }

    const artistDetails = id => {
        props.history.push(`/person/${id}`);
    }

    return (
        <div style={{ paddingBottom: '10px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '10px' }}>
                <Typography variant="h5" gutterBottom>TOP BILLED CAST</Typography>
                {
                    casts && casts.length > 12 && <Button variant="outlined" size="small" onClick={showMore}
                        style={{
                            fontSize: '11px',
                            margin: '3px 10px 8px',
                            width: '108px',
                            background: '#3f51b5',
                            color: '#fff',
                        }}>
                        {expanded ? 'Show less' : 'Show more'}
                    </Button>
                }
            </div>

            <Grid container>
                {
                    casts && casts.length &&
                    casts.slice(0, itemsToShow).map((cast, index) => {
                        return <Grid item xs={6} md={1} lg={1} sm={1} key={cast.cast_id}
                            style={{
                                marginBottom: '20px'
                            }}>
                            <div className="imagecontainer" onClick={() => artistDetails(cast.id)}>
                                <img
                                    className="image"
                                    alt={cast.name}
                                    src={cast.profile_path === null ? defaultAvatar : `https://image.tmdb.org/t/p/w185//${cast.profile_path}`} />
                                <div className="middle">
                                    <div className="text">{cast.name}</div>
                                </div>
                            </div>
                        </Grid>
                    })
                }
            </Grid>
        </div>
    )
}

export default withRouter(CastAndCrew)
