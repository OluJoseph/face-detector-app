import React from 'react';
import 'tachyons';
import "./Logo.css";
import Tilt from 'react-parallax-tilt';
import brain from "./brain.png";


const Logo = () => {
    return (
        <div className='ml4 mt0 ' style={{position:'fixed', left:'20'}}>
            <Tilt className='br2 shadow-2 logoTilt' >
                <div>
                    <img src={brain} alt={brain}/>
                </div>
            </Tilt>
        </div>
    )
}


export default Logo;