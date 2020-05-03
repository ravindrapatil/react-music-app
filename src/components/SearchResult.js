import React, { useContext } from 'react';
import {
    ListItem,
    ListItemText,
    ListItemAvatar,
    Typography,
    Divider
} from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';

import { GlobalContext } from "./GlobalState";

function SearchResult({ videos }) {
    const [{}, dispatch] = useContext(GlobalContext);

    const setCurrentVideoSnippet = data => {
        console.log(data);
        dispatch({ type: 'setCurrentVideoSnippet', snippet: data });
    }

    const handleClick = video => {
        setCurrentVideoSnippet({
            id: video.id.videoId,
            title: video.snippet.title,
            channelTitle: video.snippet.title,
            maxThumbnail: `https://img.youtube.com/vi/${video.id.videoId}/maxresdefault.jpg`,
            sdThumbnail: `https://img.youtube.com/vi/${video.id.videoId}/sddefault.jpg`
        });
    }

    return (
        <div>
            {
                videos && videos.length && videos.map((video, index) => {
                    const { snippet } = video;
                    console.log("render result times");
                    return (
                        <div key={index}>
                            <ListItem className="listBottomBorder"  alignItems="flex-start" button onClick={() => handleClick(video)}>
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
            }
        </div>
    )
}

export default SearchResult
