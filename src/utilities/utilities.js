let moviegener = [
    { id: 28, name: "Action" },
    { id: 12, name: "Adventure" },
    { id: 16, name: "Animation" },
    { id: 35, name: "Comedy" },
    { id: 80, name: "Crime" },
    { id: 99, name: "Documentary" },
    { id: 18, name: "Drama" },
    { id: 10751, name: "Family" },
    { id: 14, name: "Fantasy" },
    { id: 36, name: "History" },
    { id: 27, name: "Horror" },
    { id: 10402, name: "Music" },
    { id: 9648, name: "Mystery" },
    { id: 10749, name: "Romance" },
    { id: 878, name: "Science Fiction" },
    { id: 10770, name: "TV Movie" },
    { id: 53, name: "Thriller" },
    { id: 10752, name: "War" },
    { id: 37, name: "Western" }
]

export const formatMoney = (rev) => {
    return rev.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
}

export const formatTime = secs => {
    let minutes = Math.floor(secs / 60);
    let seconds = Math.ceil(secs - minutes * 60);
    if (seconds < 10) seconds = `0${seconds}`;
    return `${minutes}:${seconds}`;
};

export const genresList = genersforMovie => {
    const matched = moviegener.map(m => {
        return genersforMovie.filter((f, i) => {
            return f.id === m.id
        })
    });
    const filtredGener = matched.filter((v, i) => {
        return v.length === 1
    });
    console.log(filtredGener);
    return filtredGener;
}
