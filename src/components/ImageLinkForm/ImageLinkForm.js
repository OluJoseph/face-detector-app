import React from 'react';
import 'tachyons';
import './ImageLinkForm.css';


const ImageLinkForm = (props) => {
    return (
        <div className='w-100 mt3'>
            <form id='form' className='center mt4 br2' onSubmit={props.onButtonSubmit}>
                <input type='text' placeholder='Paste image url' onChange ={props.handleInputChange} value={props.url} className='urlBox pa2 ba br2 w-70 mr2 bg-transparent h2' style={{fontSize:'12px'}}/>
                <button className='detect pa2 ba br2 w-30 link grow '>Detect face</button>
            </form>
        </div>
    )
};  

export default ImageLinkForm;