import React from 'react'

function FaceDetect({ imageUrl, box }) {
    return (
        <div style={{ textAlign: 'center', position: 'relative', width: '500px', height: 'auto', margin: '0 auto' }}>
            <img id="inputimage" src={imageUrl} alt="" style={{ maxWidth: '100%' }} />
            {
                box && Object.keys(box) && <div
                    className="bounding-box"
                    // styling that makes the box visible base on the return value
                    style={{
                        top: box.topRow,
                        right: box.rightCol,
                        bottom: box.bottomRow,
                        left: box.leftCol,
                        position: 'absolute',
                        boxShadow: '0 0 0 3px #f1bf08 inset',
                        display: 'flex',
                        flexWrap: 'wrap',
                        justifyContent: 'center',
                        cursor: 'pointer'
                    }}
                ></div>
            }
        </div >
    )
}

export default FaceDetect
