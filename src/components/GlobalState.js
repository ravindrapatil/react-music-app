import React, { useReducer } from "react";

export const GlobalContext = React.createContext();

const initialState = {
    searchState: "home",
    searchResult: [],
    relatedVideos: [],
    currentVideoSnippet: {},
    latestMoviesList: [],
    menuOpen: false,
    movieGenerState: 'popular',
    someError: false,
    ticketBooking: []
}

const reducer = (state, action) => {
    switch (action.type) {
        case "setSearchState":
            return {
                ...state,
                searchState: action.snippet
            }
        case "setSearchResult":
            return {
                ...state,
                searchResult: action.snippet
            }
        case "setCurrentVideoSnippet":
            return {
                ...state,
                currentVideoSnippet: action.snippet
            }
        case "setRelatedVideos":
            return {
                ...state,
                relatedVideos: action.snippet
            }
        case "setMenuOpen":
            return {
                ...state,
                menuOpen: action.snippet
            }
        case "latestMovies":
            return {
                ...state,
                latestMoviesList: action.snippet
            }
        case "setMovieGener":
            return {
                ...state,
                movieGenerState: action.snippet
            }
        case "setSomethingWrong":
            return {
                ...state,
                someError: action.snippet
            }
        case "setTicketBooking":
            return {
                ...state,
                ticketBooking: [...state.ticketBooking, action.snippet]
            }
        default:
            return state;
    }
}

export const GlobalState = props => {
    const globalState = useReducer(reducer, initialState);
    return (
        <GlobalContext.Provider value={globalState}>
            {props.children}
        </GlobalContext.Provider>
    );
};