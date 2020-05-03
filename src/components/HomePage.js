import React, { useState, useEffect } from 'react';

import youtubeSearch, { baseParams } from '../apis/youtubeSearch';
import SongCard from '../components/SongCard';

// Few playlist object
const playlistObject = {
    LatestSongs: "PLFgquLnL59akA2PflFpeQG9L01VFg90wS",
    RomanticSongs: "PL64G6j8ePNureM8YCKy5nRFyzYf8I2noy",
    EdmSongs: "PLWlTX25IDqIxuHKq9_N1FEDVtV2sNm4CP",
    TopBolloywood: "PLcRN7uK9CFpPkvCc-08tWOQo6PAg4u0lA",
    TopPop: "PLDcnymzs18LU4Kexrs91TVdfnplU3I5zs",
    Reggaeton: "PL64G6j8ePNureM8YCKy5nRFyzYf8I2noy"
}

let slowConnectionTimeout;

function HomePage() {
    const [songsObject, setSongsObject] = useState({});

    const fetchFromApi = () => {
        slowConnectionTimeout = setTimeout(() => { }, 5000);

        const getTrendingMusic = async () => {
            const res = await youtubeSearch.get('videos', {
                params: {
                    ...baseParams,
                    chart: "mostPopular",
                    videoCategoryId: "10",
                    regionCode: localStorage.getItem('country_code')
                }
            });
            return res.data.items;
        };

        getTrendingMusic().then(data => {
            setSongsObject(prevState => {
                return { ...prevState, ...{ trending: data } }
            });
        });

        // Common method for different play list types
        const getPlayListItems = async data => {
            const res = await youtubeSearch.get('playlistItems', {
                params: {
                    ...baseParams,
                    playlistId: data
                }
            });
            return res.data.items;
        }

        // Get latestSongs
        getPlayListItems(playlistObject.TopBolloywood).then(data => {
            setSongsObject(prevState => {
                return { ...prevState, ...{ latestSongs: data } }
            });
        });

        // Get romanticSongs
        getPlayListItems(playlistObject.RomanticSongs).then(data => {
            setSongsObject(prevState => {
                return { ...prevState, ...{ romanticSongs: data } }
            });
        });

        // Get TopPop
        getPlayListItems(playlistObject.TopPop).then(data => {
            setSongsObject(prevState => {
                return { ...prevState, ...{ topPop: data } };
            });
        });
    }

    useEffect(() => {
        if (!window.navigator.onLine) {
            alert('No Internet connection');
        }

        const startingTime = new Date();
        const storedTime = localStorage.getItem('trackTime');
        const savedSongObj = JSON.parse(localStorage.getItem("homePageSongObj"));

        const checkTimeFrameAndFetch = () => {
            const timeElapsed = new Date() - Date.parse(storedTime);
            const timeElapsedInHr = timeElapsed / (1000 * 60 * 60);

            // if time is more than 12 hr we will fetch from the api
            console.log("Saved song", savedSongObj);
            if (timeElapsedInHr > 12 || !savedSongObj.latestSongs) {
                fetchFromApi();
                localStorage.setItem('trackTime', startingTime);
            } else {
                setSongsObject(savedSongObj)
            }
        }

        if (!storedTime) {
            localStorage.setItem('trackTime', startingTime);
            fetchFromApi();
        } else {
            checkTimeFrameAndFetch();
        }
    }, []);

    // if song object changes we will push it to localstoarge
    useEffect(() => {
        localStorage.setItem("homePageSongObj", JSON.stringify(songsObject));
    }, [songsObject]);

    return (
        <div style={{marginTop: '30px'}}>
            <SongCard songs={songsObject.trending} categotyTitle={"Trending Now"} />
            <SongCard songs={songsObject.latestSongs} categotyTitle={"Latest Music"} />
            <SongCard songs={songsObject.romanticSongs} categotyTitle={"Romantic Music"} />
            <SongCard songs={songsObject.topPop} categotyTitle={"Pop Music"} />
        </div>
    )
}

export default HomePage
