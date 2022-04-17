import React from 'react';
import 'tachyons';
import './FaceDetector.css';


const FaceDetector = (props) => {
    const image = <img id='inputImage' src={props.imageSrc} alt='image' className='br2' style={{width:'400px', height:'auto'}} />;
    return (
        <div className='mt2' style={{position: 'relative'}}>
            {image}
            <div className='bounding-box' style={{top: props.box.topRow, bottom:props.box.bottomRow, left: props.box.leftCol, right: props.box.rightCol}}></div>
        </div>
    )
};  

export default FaceDetector;