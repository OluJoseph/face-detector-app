import React from 'react';
import 'tachyons';
import './Rank.css';

const Rank = (props) => {
    return (
        <div className='white rank'>
            <div className='center'>
                Hi! {props.name}. Your current entry count is...
            </div>
            <div className='center f3'>
                {props.entries}
            </div>
        </div>
    )
};  

export default Rank;