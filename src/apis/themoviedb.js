import axios from "axios";
// const KEY = process.env.REACT_APP_TMDB_Keys;
const baseUrl = "https://api.themoviedb.org";

export default {
    getConfig: () => {
        axios.get(`${baseUrl}/3/configuration`, {
            params: {
                api_key: '5696692100a0d2aaeee00f4963a6d69e',
                language: 'en-US'
            }
        })
    },
    getLatestMovies: () => {
        return axios.get(`${baseUrl}/3/discover/movie`, {
            params: {
                api_key: '5696692100a0d2aaeee00f4963a6d69e',
                primary_release_year: 2019,
                sort_by: "popularity.desc",
                language: 'en-US'
            }
        }).then(res => {
            return res
        }).catch(err => {
            console.log(err);
        })
    },
    getTopRatedMovies: () => {
        return axios.get(`${baseUrl}/3/movie/top_rated`, {
            params: {
                page: 1,
                api_key: '5696692100a0d2aaeee00f4963a6d69e',
                language: 'en-US'
            }
        }).then(res => {
            return res
        }).catch(err => {
            console.log(err);
        })
    },
    getUpcomingMovies: () => {
        return axios.get(`${baseUrl}/3/movie/upcoming`, {
            params: {
                page: 1,
                api_key: '5696692100a0d2aaeee00f4963a6d69e',
                language: 'en-US'
            }
        }).then(res => {
            return res
        }).catch(err => {
            console.log(err);
        })
    },
    getMovieDetails: (id) => {
        return axios.get(`${baseUrl}/3/movie/${id}`, {
            params: {
                api_key: '5696692100a0d2aaeee00f4963a6d69e'
            }
        }).then(res => {
            return res
        }).catch(err => {
            console.log(err);
        })
    }
}

