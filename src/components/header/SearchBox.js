import React, { useCallback, useContext, useEffect, useState } from 'react';
import { withRouter } from "react-router-dom";
import {
    IconButton,
    InputBase,
    Popper,
    Container
} from "@material-ui/core/";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
// import suggestSearch from "../../apis/suggestSearch";
// import YoutubeAutocomplete from 'react-youtube-autocomplete';
import AutoSearchResult from './AutoSearchResult';
import youtubeSearch, { baseParams } from '../../apis/youtubeSearch';
import { GlobalContext } from "../GlobalState";

import JSONP from 'jsonp';

function SearchBox({ history, location }) {
    const [{ searchState }, dispatch] = useContext(GlobalContext);

    const [searchQuery, setSearchQuery] = useState('');
    const [isPopperOpen, setIsPopperOpen] = useState(false);
    const [autoSearchData, setAutoSearchData] = useState("");
    const [ytSearchQuery, setYtSearchQuery] = useState("");

    const setSearchState = useCallback(
        data => {
            dispatch({ type: 'setSearchState', snippet: data });
        }, [dispatch]
    );

    const setSearchResult = useCallback(
        (data) => {
            dispatch({ type: 'setSearchResult', snippet: data });
        }, [dispatch]
    )

    useEffect(() => {
        console.log("search state", searchState);
    }, [searchState]);

    // get youtube search result from api
    useEffect(() => {
        const searchYouTube = async data => {
            await youtubeSearch.get('/search', {
                params: {
                    ...baseParams,
                    q: data
                }
            }).then(res => {
                console.log(res.data.items);
                setSearchResult(res.data.items);
            }).catch(err => {
                console.log(err)
            });
            setSearchState('completed');
        }
        // only search if there is any value
        if (ytSearchQuery && ytSearchQuery !== '') {
            searchYouTube(ytSearchQuery)
        }
    }, [ytSearchQuery, setSearchState, setSearchResult]);

    const handleOnChange = (e) => {
        setSearchQuery(e.target.value);
        setIsPopperOpen(true);
        getAutocomplete();
    }

    const getAutocomplete = async () => {
        console.log('hi autocomplete is called');
        const googleAutoSuggestURL = '//suggestqueries.google.com/complete/search?client=youtube&ds=yt&q=';
        const url = googleAutoSuggestURL + searchQuery;
        JSONP(url, function (error, response) {
            if (error) {
                console.log(error);
            } else {
                console.log(response[1]);
                setAutoSearchData(response[1]);
            }
        })
    }

    const onSearchSelect = result => {
        console.log('Selected....' + result);
        setSearchQuery(result);
        setYtSearchQuery(result);
        setSearchState('searching');
        history.push({ pathname: '/search', search: `?q=${result}` });
    }

    const popperResult = () => {
        switch (searchState) {
            case "searching":
                return (
                    <Container>loading....</Container>
                );
            case "clicked":
                return (
                    <Container>
                        <AutoSearchResult results={autoSearchData} onSearchSelect={onSearchSelect} />
                    </Container>
                );
            case "completed":
                setIsPopperOpen(false);
                break;
            default:
                break;
        }
        console.log("Function ran");
    }

    const onSearchSubmit = e => {
        e.preventDefault();
        console.log(e.target.lastChild);
        e.target.lastChild.lastChild.blur();
        setSearchState('searching');
        setYtSearchQuery(searchQuery);
        history.push({ pathname: '/search', search: `?q=${searchQuery}` });
    }

    return (
        <>
            <IconButton color="inherit" aria-label="Menu"
                onClick={() => {
                    setSearchState('home');
                    if (history.location.pathname === '/search') {
                        history.goBack()
                    }
                }}
            >
                <ArrowBackIcon />
            </IconButton>
            <form style={{ width: "100%" }} onSubmit={e => onSearchSubmit(e)}>
                <InputBase
                    fullWidth
                    placeholder="Search..."
                    autoFocus
                    value={searchQuery}
                    onChange={handleOnChange}
                    onClick={() => {
                        setSearchState('clicked');
                        setIsPopperOpen(true);
                    }}
                    style={{ color: "#fff", paddingLeft: "16px" }} />
            </form>
            <Popper
                className="searchPopper"
                open={isPopperOpen}
                anchorEl={document.getElementById("navbar")}
                placement="bottom"
                // popperOptions={{
                //     modifiers: {
                //         preventOverflow: {
                //             padding: 0
                //         }
                //     }
                // }}
            >
                {popperResult}
            </Popper>
        </>
    )
}

export default withRouter(SearchBox)
