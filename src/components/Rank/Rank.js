import React from 'react';
import 'tachyons';
import './Rank.css';

const Rank = (props) => {
    return (
        <div className='white rank'>
            <div className='center'>
                Hi! Tobi. Your current rank is...
            </div>
            <div className='center f3'>
                #5
            </div>
        </div>
    )
};  

export default Rank;