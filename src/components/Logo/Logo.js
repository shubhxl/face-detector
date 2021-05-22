import React from 'react';
import Tilt from "react-tilt";
import "./Logo.css";
import logo from "./logo.png"

const Logo = () => {
    return(
        <div className="ma4 mt0 center">
           <Tilt className="Tilt br2 shadow-2" options={{ max : 30 }} style={{ height: 200, width: 200 }} >
            <div className="Tilt-inner pa3"> 
            <img src={logo} alt="logo"/> 
            </div>
            </Tilt>
        </div>
    )
}

export default Logo;