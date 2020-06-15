import React, { useState } from 'react'
import Clarifai from "clarifai";
import FaceDetect from './FaceDetect';
import ImageSearchForm from './ImageSearchForm';

const app = new Clarifai.App({
    apiKey: 'd7b589e1e38a48cb95995b8ed9362809'
})

function FacialDashboard() {
    const [state, setstate] = useState({
        input: '',
        imageUrl: '',
        box: {}
    });
    const { input, imageUrl, box } = state;

    const onInputChange = (e) => {
        setstate({ input: e.target.value })
    }

    const displayFaceBox = (box, input) => {
        setstate({
            box: box,
            imageUrl: input
        })
    }

    const calculateFaceLocation = res => {
        const clarifaiFace = res.outputs[0].data.regions[0].region_info.bounding_box;
        const image = document.getElementById('inputimage');
        const width = Number(image.width);
        const height = Number(image.height);
        return {
            leftCol: clarifaiFace.left_col * width,
            topRow: clarifaiFace.top_row * height,
            rightCol: width - clarifaiFace.right_col * width,
            bottomRow: height - clarifaiFace.bottom_row * height
        }
    }

    const onSubmit = e => {
        e.preventDefault();
        setstate({
            imageUrl: input
        });
        app.models.predict(Clarifai.FACE_DETECT_MODEL, input)
            .then(res => {
                console.log(res);
                // console.log(res.outputs[0].data.regions[0].region_info.bounding_box);
                const box = calculateFaceLocation(res);
                displayFaceBox(box, input);
            })
            .catch((err) => console.log(err));
    }

    return (
        <div>
            <ImageSearchForm
                onInputChange={onInputChange}
                onSubmit={onSubmit}
            />
            <FaceDetect imageUrl={imageUrl} box={box} />
        </div>
    )
}

export default FacialDashboard
