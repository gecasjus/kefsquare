import React from 'react';
import "./signin.styles.css";


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
		fetch('http://localhost:3000/signin', {
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
		<article className="mw6 center br3 pa3 pa4-ns mv3 ba b--black-10 shadow-5 center">
			<main className="pa4 black-80">
			  <form className="measure">
			    <fieldset id="sign_up" 
			    className="ba b--transparent ph0 mh0"
			    >
			      <legend className="f5 center">Sign In</legend>
			      <div className="mt3">
			        <label className="db fw6 lh-copy f6" for="email-address">Email</label>
			        <input
			        className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
			        type="email" 
			        name="email-address"  
			        id="email-address" 
					onChange={this.onEmailChange}
			        />
			      </div>
			      <div className="mv3">
			        <label className="db fw6 lh-copy f6" for="password">Password</label>
			        <input 
			        className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
			        type="password" 
			        name="password"  
			        id="password" 
			        onChange={this.onPasswordChange}
			        />
			      </div>
			    </fieldset>
			    <div className="">
			      <input
			      	onClick={this.onSubmitSignIn} 
			      	className="signin b ph3 pv2 input-reset grow pointer dib" 
			      	type="submit" 
			      	value="Sign in" />
			    </div>
			  </form>
			</main>
		</article>	
		);
	}
}

export default SignIn;