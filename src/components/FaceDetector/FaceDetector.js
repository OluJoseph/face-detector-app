import React from 'react';
import 'tachyons';
import './FaceDetector.css';


const FaceDetector = (props) => {
    const image = <img id='inputImage' onLoad={props.onImageLoad} src={props.imageSrc} alt='image' className='br2' style={{width:'400px', height:'auto'}} />;
    const allBoxes = props.boxes.map((box, i) => <div className='bounding-box' key={i} style={{top: box.topRow, bottom:box.bottomRow, left: box.leftCol, right: box.rightCol}}></div>)
    
    return (
        <div className='mt2' style={{position: 'relative'}}>
            {image}
            {allBoxes}
        </div>
    )
};  

export default FaceDetector;