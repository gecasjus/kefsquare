import React from 'react';
import './navigation.styles.css'

const Navigation = ({ onRouteChange, isSignedIn }) => {
		if (isSignedIn) {
			return (
			<nav style={{display: 'flex', justifyContent: 'flex-end', color: 'white'}}>
				<p onClick={() => onRouteChange('signout')} className='f6 link dim black pa3 pointer'> Sign out </p>
			</nav>
			);
		} else {
			return(
				<nav style={{display: 'flex', justifyContent: 'flex-end', color: 'white'}}>
					<p onClick={() => onRouteChange('SignIn')} className='f3 link dim black pa3 pointer'> Sign In </p>
					<p onClick={() => onRouteChange('Register')} className='f3 link dim black pa3 pointer'> Register </p>
				</nav>
			);
	}
}	
export default Navigation;
