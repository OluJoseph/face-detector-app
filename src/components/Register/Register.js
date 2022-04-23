import React from 'react';
import 'tachyons';

class Register extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            name: '',
            email: '',
            password: '',
            registerSuccess: ''
        }
    }

    onNameChange = (e) => {
        this.setState({name: e.target.value});
    }

    onEmailChange = (e) => {
        this.setState({email: e.target.value});
    }

    onPasswordChange = (e) => {
        this.setState({password: e.target.value})
    }

    reloadRegister = () => {
        this.setState({registerSuccess: ''})
    }

    onSubmitRegister = (e) => {
        e.preventDefault();    
        
        fetch('http://localhost:3000/register', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                name: this.state.name,
                email: this.state.email,
                password: this.state.password
            })
        })
        .then(resp => resp.json())
        .then(result => {
                if(result === 'successful') {
                    this.setState({registerSuccess: result})
                    setTimeout(() => 
                    {
                        this.props.onRouteChange('sign in')
                    }, 1500)
                }else{
                    this.setState({registerSuccess: result})
                }
        })
    }

    render() {
        const message = (this.state.registerSuccess === 'successful') 
        ? <span className='green center'> Successful... </span> 
        : <span className='red center'> {this.state.registerSuccess} </span>;

        return (
            <article className="pa4 black-80 center pt6">
                <form action="sign-up_submit" method="get" acceptCharset="utf-8" className='shadow-4 pa4'>
                    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                        <legend className="ph0 mh0 fw6 f3 center">Sign Up</legend>
                        <div className="mt3">
                            <label className="db fw6 lh-copy f6" htmlFor="email-address">Name</label>
                            <input
                             className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                             type="text" name="name"  
                             id="Name"
                             onChange={this.onNameChange}
                            />
                        </div>
                        <div className="mt3">
                            <label className="db fw6 lh-copy f6" htmlFor="email-address">Email address</label>
                            <input
                             className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                             type="email" 
                             name="email-address"  
                             id="email-address"
                             onChange={this.onEmailChange}
                            />
                        </div>
                        <div className="mt3">
                            <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                            <input
                             className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                             type="password" 
                             name="password"  
                             id="password" 
                             onChange={this.onPasswordChange}
                            />
                        </div>
                        
                    </fieldset>
                    {message}
                    <div className="mt3 center">
                        <input
                         className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6" 
                         onClick={this.onSubmitRegister} 
                         type="submit" 
                         value="Register" />
                    </div>
                    <div className="lh-copy mt3 center">
                        <a href="#0" className="f7 link dim black db" onClick={() => this.props.onRouteChange('sign in')}>Sign in</a>
                    </div>
                </form>
            </article>
        )
    }
};  

export default Register;