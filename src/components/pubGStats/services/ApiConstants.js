const API_END_POINTS = {
    SYSTEM_USER_INFO: {
        httpMethod: "GET",
        endPointUrl: `https://api.pubg.com/shards/steam/players?filter[playerNames]=`
    },
    PLAYER_GAMEMODE_STATESTICS: {
        httpMethod: "GET",
        endPointUrl: `https://api.pubg.com/shards/steam/seasons/lifetime/gameMode/squad/players?filter[playerIds]=`
    },
    FOOTBALL_PLAYERS_STATISTICS: {
        httpMethod: "GET",
        endPointUrl: `https://my.api.mockaroo.com/employee?key=a11a1ef0`
        
    }
}

export default API_END_POINTS