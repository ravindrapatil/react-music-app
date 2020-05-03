import React, { useContext, useEffect, useRef, useState } from 'react'
import {
    Container,
    Typography
} from '@material-ui/core';

import { GlobalContext } from "../GlobalState";

import getAudioLink from "../../apis/getAudioLink";
import youtubeSearch, { baseParams } from "../../apis/youtubeSearch";
import "../../apis/saveCountry";
import "../../style.css";
import MiniMusicPlayer from './MiniMusicPlayer';
import PlayerTopBar from './PlayerTopBar';
import TimelineControl from './TimelineControl';
import PlayPauseButton from './PlayPauseButton';
import NextButton from './NextButton';
import PreviousButton from './PreviousButton';

let relatedVideosVar;

function MainPlayer({ location, history }) {
    let params = new URLSearchParams(location.search);
    const [{ currentVideoSnippet }, dispatch] = useContext(GlobalContext);

    const containerRef = useRef();
    const audioPlayer = useRef();
    const player = audioPlayer.current;

    const [playerState, setPlayerState] = useState(null);
    // there will be 3 states
    // maximized, minimized, playlist

    const [audioState, setAudioState] = useState(null);
    // there will be 4 states
    // loading, loaded, playing, paused

    const setCurrentVideoSnippet = data => {
        dispatch({ type: 'setCurrentVideoSnippet', snippet: data });
    }

    const passToGlobalState = data => {
        dispatch({ type: 'setRelatedVideos', snippet: data});
    }

    const [isItFromPlaylist, setIsItFromPlaylist] = useState(false);
    const [relatedVideos, setRelatedVideos] = useState([]);
    const [isNextFromMini, setIsNextFromMini] = useState(false);
    const [minimized, setMinimized] = useState(true);

    const playAudio = () => {
        audioPlayer.current.play()
            .then(_ => {
                console.log("audio played auto");
            })
            .catch(error => {
                console.log(error);
                setAudioState("paused");
            })
    }

    const setVideoSnippet = video => {
        setCurrentVideoSnippet({
            id: video.id.videoId,
            title: video.snippet.title,
            channelTitle: video.snippet.channelTitle,
            maxThumbnail: `https://img.youtube.com/vi/${video.id.videoId}/hqdefault.jpg`,
            sdThumbnail: `https://img.youtube.com/vi/${video.id.videoId}/sddefault.jpg`
        })
    }

    useEffect(() => {
        console.log("state changed triggedred");
        const getAudio = async data => {
            if (playerState !== "playlist" && !isNextFromMini) {
                setPlayerState("maximized");
                console.log("maximizing here yar and state is", playerState);
            }

            setTimeout(() => {
                setIsNextFromMini(false);
                // change it back to false
            }, 200);

            setAudioState("loading");
            const res = await getAudioLink.get('/song', {
                params: {
                    id: data
                }
            });

            // setPlayerState("maximized");
            audioPlayer.current.src = res.data;
            playAudio();
        };

        if (currentVideoSnippet.id) {
            getAudio(currentVideoSnippet.id);
        }

        if (currentVideoSnippet.id) {
            // Get search related data
            const searchRelated = async () => {
                const res = await youtubeSearch.get('/search', {
                    params: {
                        ...baseParams,
                        relatedToVideoId: currentVideoSnippet.id,
                        videoCategoryId: 10,
                        type: 'video',
                        maxResults: 10
                    }
                });
                setRelatedVideos(res.data.items);
                passToGlobalState(res.data.items);
            }

            // if its not from the mini next button then only change history
            if (!isNextFromMini) {
                if (!isItFromPlaylist) {
                    if (location.pathname !== "/play") {
                        // prevent duplicating history
                        history.push(`/play?id=${currentVideoSnippet.id}`);
                    }
                    searchRelated();
                } else {
                    history.replace(`/play?id=${currentVideoSnippet.id}`);
                    setIsItFromPlaylist(false);
                }
            }
            console.log(currentVideoSnippet);
        }
    }, [currentVideoSnippet]); // setIsItFromPlaylist

    useEffect(() => {
        if (location.pathname === '/play' && !currentVideoSnippet.id) {
            console.log("history is in play fetching song");
            fetchAndSetCurrentVideoSnippet(params.get("id"));
        }
        const unlisten = history.listen(location => {
            if (location.pathname === '/play') {
                if (history.action !== 'REPLACE') {
                    setPlayerState('maximized');
                    console.log('set player state to maximized');
                } else {
                    setPlayerState('minimized');
                    console.log('set player state to minimized');
                }
            } else {
                setPlayerState('minimized');
            }
            console.log(history);
        });
        return () => {
            unlisten()
        }
    }, [history]);

    const fetchAndSetCurrentVideoSnippet = id => {
        youtubeSearch
            .get("videos", {
                params: {
                    ...baseParams,
                    id: id
                }
            })
            .then(res => {
                const item = res.data.items[0];
                console.log(currentVideoSnippet);
                setCurrentVideoSnippet({
                    id: item.id,
                    title: item.snippet.title,
                    channelTitle: item.snippet.channelTitle,
                    maxThumbnail: `https://img.youtube.com/vi/${item.id}/maxresdefault.jpg`,
                    sdThumbnail: `https://img.youtube.com/vi/${item.id}/sddefault.jpg`
                    // this is the url of the max resolution of thumbnail
                });
            });
    };

    useEffect(() => {
        relatedVideosVar = relatedVideos;
        console.log('related videos', relatedVideosVar);
    }, [relatedVideos]);

    useEffect(() => {
        console.log("Is next state", isNextFromMini);
    }, [isNextFromMini]);

    const minimizePlayerHandle = () => {
        history.goBack();
        setPlayerState('minimized');
    }

    const playNext = () => {
        // setIsItFromPlaylist(true);
        console.log("play next related videos", relatedVideos);

        const currentIndex = relatedVideosVar.findIndex(
            video => video.id.videoId === currentVideoSnippet.id
        )
        console.log("the current index is", currentIndex);

        console.log("hey we will play next song");
        let video = relatedVideosVar[currentIndex + 1];
        setVideoSnippet(video);
    }

    const playPrevious = () => {
        // setIsItFromPlaylist(true);
        if (player.currentTime > 5) {
            player.currentTime = 0;
        } else {
            const currentIndex = relatedVideosVar.findIndex(
                video => video.id.videoId === currentVideoSnippet.id
            )
            if (currentIndex !== -1) {
                let video = relatedVideosVar[currentIndex - 1];
                setVideoSnippet(video);
            } else {
                player.currentTime = 0;
            }
            console.log(currentIndex);
        }
    }

    // const toggleMaxPlaylist = () => {
    //     if (playerState === "playlist") {
    //         setPlayerState("maximized")
    //     } else {
    //         setPlayerState("playlist")
    //     }
    //     console.log("Maximize the playlist");
    // }

    const retriveMaximizedPlayer = () => {
        if (playerState === 'maximized' || playerState === "playlist") {
            return (
                <Container>
                    <PlayerTopBar minimizePlayer={() => { minimizePlayerHandle() }} />
                    <div className="avaterTitleContent">
                        <img src={currentVideoSnippet.maxThumbnail} alt={currentVideoSnippet.title} />
                        <Typography variant="h5" color="primary">{currentVideoSnippet.title}</Typography>
                        <Typography variant="p" color="primary">{currentVideoSnippet.channelTitle}</Typography>
                    </div>
                    <TimelineControl audioState={audioState} player={player} />
                    <div className="playerActions">
                        <PreviousButton playPreviousSong={playPrevious} />
                        <PlayPauseButton audioState={audioState} player={player} />
                        <NextButton playNextSong={playNext} />
                    </div>
                </Container>
            )
        }
    }

    const retriveMinimizedPlayer = () => {
        if (playerState === 'minimized' && currentVideoSnippet.id) {
            return (
                <div>
                    <MiniMusicPlayer
                        playPause={{
                            player: player,
                            minimized: minimized,
                            audioState: audioState
                        }}
                        emptyPlayer={e => {
                            e.stopPropagation();
                            setCurrentVideoSnippet([])
                        }}
                        data={currentVideoSnippet}
                        playNext={e => {
                            e.stopPropagation();
                            setIsNextFromMini(true);
                            playNext();
                        }}
                    />
                    <TimelineControl audioState={audioState} player={player} minimized={minimized} />
                </div>
            )
        }
    }

    const expandPlayer = () => {
        if (playerState === 'minimized') {
            setPlayerState("maximized");
            setMinimized(true);
            history.push({
                pathname: '/play',
                search: `?id=${currentVideoSnippet.id}`,
                state: { modal: true }
            })
        }
    }

    const returnMinMaxClass = () => {
        if (playerState === 'minimized') {
            return "playerMinimized"
        } else if (playerState === 'playlist') {
            return "playerPlaylist"
        }
    }

    if (!currentVideoSnippet.id) {
        return null
    }


    return (
        <div ref={containerRef} onClick={expandPlayer} className={"mediaPlayerContainer " + returnMinMaxClass()}>
            {retriveMaximizedPlayer()}
            {retriveMinimizedPlayer()}
            <audio
                id="audio-element"
                autoPlay
                ref={audioPlayer}
                onLoadStart={() => {
                    setAudioState("loading");
                }}
                onPlay={() => setAudioState("playing")}
                onPlaying={() => setAudioState("playing")}
                onPause={() => setAudioState("paused")}
            />
        </div>
    )
}

export default MainPlayer
