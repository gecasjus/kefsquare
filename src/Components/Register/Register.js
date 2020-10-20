import React from 'react';
import "./register.styles.css";

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
		fetch('http://localhost:3000/register', {
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
			}
		})
	} 

	render() {
		return (
		<article className="mw6 center br3 pa3 pa4-ns mv3 ba b--black-10 shadow-5">
			<main className="pa4 black-80">
			  <form className="measure">
			    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
			      <legend className="f5 center">Register</legend>
			      <div className="mt3">
			        <label className="db fw6 lh-copy f6" for="name">Name</label>
			        <input 
			        className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
			        type="text" 
			        name="name"  
			        id="name" 
			        onChange={this.onNameChange}
			        />
			      </div>
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
			      	className="registerbutton b ph3 pv2 input-reset grow pointer dib" 
			      	type="submit" 
			      	value="Register" />
			    </div>
			  </form>
			</main>
		</article>	
		);
	}
}

export default Register;