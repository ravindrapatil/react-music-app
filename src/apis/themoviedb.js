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
        })
    },
    getPopularMovies: (page_num) => {
        return axios.get(`${baseUrl}/3/movie/popular`, {
            params: {
                page: page_num,
                api_key: '5696692100a0d2aaeee00f4963a6d69e',
                language: 'en-US'
            }
        })
    },
    getTopRatedMovies: (page_num) => {
        return axios.get(`${baseUrl}/3/movie/top_rated`, {
            params: {
                page: page_num,
                api_key: '5696692100a0d2aaeee00f4963a6d69e',
                language: 'en-US'
            }
        })
    },
    getUpcomingMovies: (page_num) => {
        return axios.get(`${baseUrl}/3/movie/upcoming`, {
            params: {
                page: page_num,
                api_key: '5696692100a0d2aaeee00f4963a6d69e',
                language: 'en-US'
            }
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
    },
    getImages: (id) => {
        return axios.get(`${baseUrl}/3/movie/${id}/images`, {
            params: {
                api_key: '5696692100a0d2aaeee00f4963a6d69e'
            }
        }).then(res => {
            return res
        }).catch(err => {
            console.log(err);
        })
    },
    getPersonImages: (id) => {
        return axios.get(`${baseUrl}/3/person/${id}/images`, {
            params: {
                api_key: '5696692100a0d2aaeee00f4963a6d69e'
            }
        }).then(res => {
            return res
        }).catch(err => {
            console.log(err);
        })
    },
    getCredits: (id) => {
        return axios.get(`${baseUrl}/3/movie/${id}/credits`, {
            params: {
                api_key: '5696692100a0d2aaeee00f4963a6d69e'
            }
        }).then(res => {
            return res
        }).catch(err => {
            console.log(err);
        })
    },
    getRecommendations: id => {
        return axios.get(`${baseUrl}/3/movie/${id}/recommendations`, {
            params: {
                api_key: '5696692100a0d2aaeee00f4963a6d69e'
            }
        }).then(res => {
            return res
        }).catch(err => {
            console.log(err);
        })
    },
    getArtistDetails: id => {
        return axios.get(`${baseUrl}/3/person/${id}`, {
            params: {
                api_key: '5696692100a0d2aaeee00f4963a6d69e'
            }
        }).then(res => {
            return res
        }).catch(err => {
            console.log(err);
        })
    },
    getMovieCredits: id => {
        return axios.get(`${baseUrl}/3/person/${id}/movie_credits`, {
            params: {
                api_key: '5696692100a0d2aaeee00f4963a6d69e'
            }
        }).then(res => {
            return res
        }).catch(err => {
            console.log(err);
        })
    },
    getSearchMovies: (query, page_num) => {
        return axios.get(`${baseUrl}/3/search/movie`, {
            params: { 
                query, 
                page: page_num,
                api_key: '5696692100a0d2aaeee00f4963a6d69e'
            }
        })
    }
}

