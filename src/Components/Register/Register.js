import React from 'react';
import "./register.styles.scss";

class Register extends React.Component {
		constructor(props){
		super(props);
		this.state = {
			email: '',
			password: '' ,
			name: ''
		}
	}

	onNameChange = (event) => {
		this.setState({name: event.target.value})
	}
	onEmailChange = (event) => {
		this.setState({email: event.target.value})
	}
	onPasswordChange = (event) => {
		this.setState({password: event.target.value})
	}

	onSubmitSignIn = (event) => {
		event.preventDefault();
		fetch('https://calm-mountain-29448.herokuapp.com/register', {
			method: 'post',
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify({
				email: this.state.email,
				password: this.state.password,
				name: this.state.name
			})
		})
		.then(response => response.json())
		.then(user => {
			if (user.id) {
				this.props.loadUser(user);
				this.props.onRouteChange('home')
			} else {
				alert('wrong input');
			}
		})
	} 

	render() {
		return (
		<div className="mw6 center br3 pa3 pa4-ns mv3 ba b--black-10 shadow-5">
			  <form className="go-bottom">
			       <legend className="f5 center mb4">Register</legend>
			      <div className="mt3">
			        <input 
			        className="pa2 input-reset ba bg-transparent w-100" 
			        type="text" 
			        name="name"  
			        id="name" 
			        onChange={this.onNameChange}
			        />
			        <label className="db fw6 lh-copy f6" for="name">Name</label>
			      </div>
			      <div className="mt3">
			        <input 
			        className="pa2 input-reset ba bg-transparent w-100" 
			        type="email" 
			        name="email-address"  
			        id="email-address" 
			        onChange={this.onEmailChange}
			        />
			        <label className="db fw6 lh-copy f6" for="email-address">Email</label>
			      </div>
			      <div className="mv3">
			        <input 
			        className="b pa2 input-reset ba bg-transparent w-100" 
			        type="password" 
			        name="password"  
			        id="password" 
			        onChange={this.onPasswordChange}
			        />
			        <label className="db fw6 lh-copy f6" for="password">Password</label>
			      </div>
			    <div className="register center">
			      <button
			      	id="button"
			      	onClick={this.onSubmitSignIn} 
			      	className="signin ph2 pv2 mt3 grow pointer" 
			      	type="submit" 
			      	value="Sign in"
			      	>Register
			      	</button>
			    </div>
			  </form>
			</div>
		);
	}
}

export default Register;