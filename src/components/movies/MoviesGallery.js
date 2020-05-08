import React, { useState, useEffect } from 'react';
import { PhotoSwipeGallery } from 'react-photoswipe';
import 'react-photoswipe/lib/photoswipe.css';
import Typography from '@material-ui/core/Typography';
// import Carousel, { Modal, ModalGateway } from "react-images";
// import Gallery from "react-photo-gallery";

function MoviesGallery({ movieImages }) {
    const swipeGalleryInitial = {
        items: []
    }

    const [swipeGalleryState, setswipeGalleryState] = useState(swipeGalleryInitial);

    useEffect(() => {
        if (movieImages && movieImages.length) {
            let itemss = movieImages.map((item) => {
                return {
                    src: `https://image.tmdb.org/t/p/original///${item.file_path}`,
                    thumbnail: `https://image.tmdb.org/t/p/original///${item.file_path}`,
                    w: 1200,
                    h: 900,
                    title: 'Image 1'
                }
            });
            setswipeGalleryState({ ...swipeGalleryState, items: itemss })
        }
    }, [movieImages]);

    const { items } = swipeGalleryState;

    const getThumbnailContent = (item) => {
        return (
            <img alt="" src={item.thumbnail} width={120} height={120} />
        );
    }

    let options = {
        //http://photoswipe.com/documentation/options.html
    };

    const template = <>
        <Typography variant="h5" gutterBottom>IMAGES</Typography>
        {
            items && items.length &&
            <>
                <PhotoSwipeGallery items={items} options={options} thumbnailContent={getThumbnailContent} />
            </>
        }
    </>

    return (
        <div style={{ marginBottom: '30px' }}>
            {
                movieImages !== undefined && template
            }

        </div>
    )
}

export default MoviesGallery
