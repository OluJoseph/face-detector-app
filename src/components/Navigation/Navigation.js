import React from 'react';
import 'tachyons';
import Logo from '../Logo/Logo';


const Navigation = (props) => {
    return (
        <nav className='pt3 mb5' style={{display:'flex', justifyContent:'space-between', height:'fit-content'}}>
            <Logo />
            <p className=' dim pointer pa3 ma0 link black underline' onClick={() => props.onRouteChange('sign in')} style={{position:'fixed', right: '20px'}}>Sign out</p>
        </nav>
    )
}


export default Navigation;