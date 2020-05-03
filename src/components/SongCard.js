import React, { useContext } from 'react';
import Card from '@material-ui/core/Card';
import {
    CardActionArea,
    CardContent,
    CardMedia,
    Typography,
    Container,
    LinearProgress,
    Grid
} from '@material-ui/core';

import AliceCarousel from 'react-alice-carousel'
import 'react-alice-carousel/lib/alice-carousel.css'

import { GlobalContext } from './GlobalState';

function SongCard({ songs, categotyTitle }) {
    const [{ }, dispatch] = useContext(GlobalContext);

    const responsive = {
        0: {
            items: 1
        },
        600: {
            items: 3
        },
        1024: {
            items: 4
        }
    }

    const setCurrentVideoSnippet = (data) => {
        dispatch({ type: 'setCurrentVideoSnippet', snippet: data })
    }

    const handleSongSelected = song => {
        if (!song.snippet.resourceId) {
            setCurrentVideoSnippet({
                id: song.id,
                title: song.snippet.title,
                channelTitle: song.snippet.channelId,
                maxThumbnail: `https://i.ytimg.com/vi/${song.id}/maxresdefault.jpg`,
                sdThumbnail: `https://i.ytimg.com/vi/${song.id}/sddefault.jpg`
            })
        } else {
            setCurrentVideoSnippet({
                id: song.snippet.resourceId.videoId,
                title: song.snippet.title,
                channelTitle: song.snippet.channelId,
                maxThumbnail: `https://i.ytimg.com/vi/${song.snippet.resourceId.videoId}/maxresdefault.jpg`,
                sdThumbnail: `https://i.ytimg.com/vi/${song.snippet.resourceId.videoId}/sddefault.jpg`
            })
        }
        console.log(song);
    }

    if (songs) {
        const renderCards = <AliceCarousel responsive={responsive} mouseTrackingEnabled
            // autoPlayInterval={1500}
            // autoPlay={true}
            dotsDisabled={true}
            fadeOutAnimation={true}>
            {
                songs.map((song, index) => {
                    return (
                        <Card key={index} style={{ margin: '0 10px' }}>
                            <CardActionArea onClick={() => handleSongSelected(song)}>
                                <CardMedia style={{ height: '160px' }}
                                    component="img"
                                    src={song.snippet.thumbnails.high.url}
                                    loading="lazy"
                                />
                                <CardContent>
                                    <Typography gutterBottom variant="body2" component="p" style={{ height: '40px' }}>
                                        {song.snippet.title.slice(0, 70) + " ..."}
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    )
                })
            }
        </AliceCarousel>
        return (
            <div>
                <Typography variant="h5" gutterBottom={true}>
                    {categotyTitle}
                </Typography>
                <div className={"cardSlider"}>
                    {renderCards}
                </div>
            </div>
        )
    } else {
        return (
            <Container style={{ height: "25vh" }}>
                <LinearProgress color="primary" />
            </Container>
        )
    }
}

export default SongCard
