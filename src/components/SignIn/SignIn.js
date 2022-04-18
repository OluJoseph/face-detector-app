import React from 'react';
import 'tachyons';
// import './SignIn.css';


const SignIn = (props) => {
    return (
        <main className="pa4 black-80 center pt6">
            <form className="measure shadow-4 pa4">
                <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                    <legend className="f3 fw6 ph0 mh0 center">Sign In</legend>
                    <div className="mt3">
                        <label className="db fw6 lh-copy f6" for="email-address">Email</label>
                        <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="email" name="email-address"  id="email-address" />
                    </div>
                    <div className="mv3">
                        <label className="db fw6 lh-copy f6" for="password">Password</label>
                        <input className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="password" name="password"  id="password" />
                    </div>

                </fieldset>
                <div className="center">
                    <input className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f7 dib" onClick={() => props.onRouteChange('SignOut')} type="submit" value="Sign in" />
                </div>
                <div className="lh-copy mt3 center">
                    <a href="#0" className="f7 link dim black db">Sign up</a>
                </div>
            </form>
        </main>
    )
};  

export default SignIn;