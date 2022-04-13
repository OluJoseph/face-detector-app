import React from 'react';
import 'tachyons';
import Logo from '../Logo/Logo';


const Navigation = () => {
    return (
        <nav className='pt3' style={{display:'flex', justifyContent:'space-between', height:'fit-content'}}>
            <Logo />
            <p className=' dim pointer pa3 ma0 link black underline'>Sign out</p>
        </nav>
    )
}


export default Navigation;