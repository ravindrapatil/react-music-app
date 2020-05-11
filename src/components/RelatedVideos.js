import React, { useContext } from 'react';
import {
    ListItem,
    ListItemText,
    ListItemAvatar,
    Typography,
    Divider
} from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import { Helmet } from "react-helmet";

import { GlobalContext } from './GlobalState';

function RelatedVideos() {
    const [{ relatedVideos }, dispatch] = useContext(GlobalContext);

    const setCurrentVideoSnippet = data => {
        dispatch({ type: 'setCurrentVideoSnippet', snippet: data });
    }

    const handleClick = video => {
        setCurrentVideoSnippet({
            id: video.id.videoId,
            title: video.snippet.title,
            channelTitle: video.snippet.channelTitle,
            maxThumbnail: `https://img.youtube.com/vi/${video.id.videoId}/hqdefault.jpg`,
            sdThumbnail: `https://img.youtube.com/vi/${video.id.videoId}/sddefault.jpg`
        })
    }

    const noResultsMsg = <div style={{padding: '40px', textAlign: 'center'}}>No Related audios found</div>

    const template = <>{
        relatedVideos.map((video, index) => {
            const { snippet } = video;
            return (
                <div key={index}>
                    <ListItem className="listBottomBorder" alignItems="flex-start" button onClick={() => handleClick(video)}>
                        <ListItemAvatar>
                            <Avatar alt={snippet.title}
                                style={{ width: "60px", height: "60px", marginRight: "15px" }}
                                src={snippet.thumbnails.default.url} />
                        </ListItemAvatar>
                        <ListItemText
                            primary={snippet.title}
                            secondary={
                                <>
                                    <Typography
                                        component="span"
                                        variant="body2"
                                        color="textPrimary"
                                    >
                                        {snippet.channelTitle}
                                    </Typography>
                                </>
                            }
                        >
                        </ListItemText>
                    </ListItem>
                    <Divider />
                </div>
            )
        })
    }</>

    return (
        <div>
            <Helmet>
                {
                    <title>SIM Music - Related Music</title>
                }
            </Helmet>
            {
                relatedVideos && relatedVideos.length ? template : noResultsMsg
            }
        </div>
    )
}

export default RelatedVideos