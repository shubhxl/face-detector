import React from 'react'
import "./FaceRecognition.css"

export default function FaceRecognition({imageURL, box}) {
    return (
        <div className="center">
            <div className="absolute mt2">
            <img src={imageURL} id="inputi" alt="" width="500px" height="auto" />
            <div className="sbox" style=
                                {{
                                  top: box.topRow, 
                                  right: box.rightCol, 
                                  bottom: box.bottomRow, 
                                  left: box.leftCol
                                  }}>
            </div>
            </div>
        </div>
    )
}
