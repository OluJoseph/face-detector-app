import React from 'react';
import 'tachyons';

const Register = (props) => {
    return (
        <article className="pa4 black-80 center pt6">
            <form action="sign-up_submit" method="get" accept-charset="utf-8" className='shadow-4 pa4'>
                <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                    <legend className="ph0 mh0 fw6 f3 center">Sign Up</legend>
                    <div className="mt3">
                        <label className="db fw6 lh-copy f6" htmlFor="email-address">Name</label>
                        <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="text" name="name"  id="Name" />
                    </div>
                    <div className="mt3">
                        <label className="db fw6 lh-copy f6" htmlFor="email-address">Email address</label>
                        <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="email" name="email-address"  id="email-address" />
                    </div>
                    <div className="mt3">
                        <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                        <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="password" name="password"  id="password" />
                    </div>
                </fieldset>
                <div className="mt3 center"><input className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6" onClick={() => props.onRouteChange('home')} type="submit" value="Register" /></div>
                <div className="lh-copy mt3 center">
                    <a href="#0" className="f7 link dim black db" onClick={() => props.onRouteChange('sign in')}>Sign in</a>
                </div>
            </form>
        </article>
    )
};  

export default Register;