const API_END_POINTS = {
    SYSTEM_USER_INFO: {
        httpMethod: "GET",
        endPointUrl: `https://api.pubg.com/shards/steam/players?filter[playerNames]=`
    },
    PLAYER_GAMEMODE_STATESTICS: {
        httpMethod: "GET",
        endPointUrl: `https://api.pubg.com/shards/steam/seasons/lifetime/gameMode/squad/players?filter[playerIds]=`
    }
}

export default API_END_POINTS