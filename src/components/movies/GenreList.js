import React from 'react'

function GenreList({ genres }) {
    return (
        <>
            {
                genres && genres.length && genres.map((gener, index) => {
                    return <span key={index} title={gener.name}>{gener.name}, </span>
                })
            }
        </>
    )
}

export default GenreList
