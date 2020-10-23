import React from 'react';
import "./signin.styles.scss";


class SignIn extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			signInEmail: '',
			signInPassword: '' 
		}
	}
	onEmailChange = (event) => {
		this.setState({signInEmail: event.target.value})
	}

	onPasswordChange = (event) => {
		this.setState({signInPassword: event.target.value})
	}

	onSubmitSignIn = (event) => {
		event.preventDefault();
		fetch('https://calm-mountain-29448.herokuapp.com/signin', {
			method: 'post',
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify({
				email: this.state.signInEmail,
				password: this.state.signInPassword
			})
		})
		.then(response => response.json())
		.then(user => {
			if (user.id) {
				this.props.loadUser(user);
				this.props.onRouteChange('home');
			}
		})
	} 

	render() {
		return (
			<div className="center mw6 br3 pa3 pa4-ns mv3 ba b--black-10 shadow-5">
			  <form className="go-bottom">
			     <legend className="f5 center mb4">Sign In</legend>
			      <div className="mt3">
			        <input
			        className="pa2 input-reset ba bg-transparent w-100" 
			        type="email" 
			        name="email-address"  
			        id="email-address" 
					onChange={this.onEmailChange}
			        />
			        <label for="email-address">Email</label>
			      </div>
			      <div className="mv3">
			        <input 
			        className="pa2 input-reset ba bg-transparent w-100" 
			        type="password" 
			        name="password"  
			        id="password" 
			        onChange={this.onPasswordChange}
			        />
			        <label className="" for="password">Password</label>
			      </div>
			    <div className="signin center">
			      <button
			      	id="button"
			      	onClick={this.onSubmitSignIn} 
			      	className="signin ph2 pv2 mt3 black pointer" 
			      	type="submit" 
			      	value="Sign in"
			      	>Sign In</button>
			    </div>
			  </form>
			</div>
		);
	}
}

export default SignIn;