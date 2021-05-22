import React from 'react';
import "./Image.css";

const Image = ({onInpChange, onSubmit}) => {
    return(
        <div className="ma2">
        <p className="f3 white">
        This app can detect number of faces in an image. Just paste the Image URL and see the magic
        </p>
        <div className="center form bg-light-red pa4 br4">
            <input className="f3 pa2 w-80 center" type="text" onChange={onInpChange}/>
            <button className="w-40 grow f4 ma2 br2 dib white bg-navy" onClick={onSubmit}>Detect</button>
        </div>
        </div>
    )
}

export default Image;