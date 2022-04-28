import React from 'react';
import 'tachyons';

class SignIn extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            signInEmail : '',
            signInPassword: '',
            singInSuccess: '',
            errorMessage: ''
        }

        this.onEmailChange = this.onEmailChange.bind(this);
        this.onPasswordChange = this.onPasswordChange.bind(this);
    }

    onEmailChange = (e) => {
        this.setState({signInEmail: e.target.value});
    }

    onPasswordChange = (e) => {
        this.setState({signInPassword: e.target.value})
    }

    reloadSignIn = () => { //TRYING TO REMEMBER WHY I DID THIS
        this.setState({singInSuccess: ''})
    }

    onSubmitSignIn = (e) => {
        e.preventDefault();

        fetch('https://serene-beyond-02376.herokuapp.com/signin', {
            method: 'post',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                email: this.state.signInEmail,
                password: this.state.signInPassword
            })
        })
        .then(resp => resp.json())
        .then(data => {
            if (data.signInMessage === 'success') {
                this.setState({singInSuccess: true})
                this.props.getUser(data.user)
                this.props.onRouteChange('home');
            }else{
                this.setState({singInSuccess: 'noSuccess'})
                this.setState({errorMessage: data})
            }
        })
        .catch(err => {
            console.log("error fetching data")
        })        
    }

    render () {
        const {errorMessage} = this.state;
        return (
            <main className="pa4 black-80 center pt6 measure" >
                <form className="measure shadow-4 pa4 " onLoad={this.reloadSignIn}>
                    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                        <legend className="f3 fw6 ph0 mh0 center">Sign In</legend>
                        <div className="mt3">
                            <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                            <input
                             className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                             type="email" 
                             name="email-address"  
                             id="email-address" 
                             onChange={this.onEmailChange}
                            />
                        </div>
                        <div className="mv3">
                            <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                            <input
                             className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                             type="password" 
                             name="password"  
                             id="password"
                             onChange={this.onPasswordChange}
                            />
                            
                        </div>
                        {this.state.singInSuccess === 'noSuccess' && <span className='red f7 center'>{errorMessage}</span>}
    
                    </fieldset>
                    <div className="center">
                        <input
                         className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f7 dib" 
                         onClick={this.onSubmitSignIn} 
                         type="submit" 
                         value="Sign in" />
                    </div>
                    <div className="lh-copy mt3 center">
                        <a href="#0" className="f7 link dim black db" onClick={() => this.props.onRouteChange('register')}>Register</a>
                    </div>
                </form>
                
            </main>
        )
    }
};  

export default SignIn;