import axios from 'axios';
const KEY = process.env.REACT_APP_YouTube_Keys;

export const baseParams = {
    part: "snippet",
    maxResults: 15,
    key: "AIzaSyD4dOTiLM8WNP-G7Bu9lMi0YGRjha52_Qw"
};
export default axios.create({
    baseURL: "https://www.googleapis.com/youtube/v3",
    params: baseParams
});