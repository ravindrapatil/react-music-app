import axios from 'axios';

// export const selectRandomKey = () => {
//     const keys = process.env.REACT_APP_YouTube_Keys;
//     // const random = Math.floor(Math.random() * Math.floor(keys.length));    
//     return keys;
// }

// const KEY = process.env.REACT_APP_YouTube_Keys;

// export default axios.create({
//     baseURL: 'https://www.googleapis.com/youtube/v3',
//     params: { 
//         part: "snippet",
//         maxResults: 10,
//         key: KEY
//     }
// })

const KEY = process.env.REACT_APP_YouTube_Keys;

export const baseParams = {
    part: "snippet",
    maxResults: 15,
    key: KEY
};
export default axios.create({
    baseURL: "https://www.googleapis.com/youtube/v3",
    params: baseParams
});