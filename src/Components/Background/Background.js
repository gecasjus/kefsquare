import React from 'react';
import './Background.Styles.css';
import kid from './kid.png';
import uncle from './uncle.png'

const Background = () => (
<div className="inner">
	<img className="photo" src={kid} />
	<img src={uncle} />
		<div className="side animate__animated animate__fadeIn animate__delay-1s">square</div>
		<div className="horizontal animate__animated animate__fadeIn animate__delay-1.5s">kef</div>
			<div className="squarex1 animate__animated animate__fadeIn animate__delay-2s animate__slower 3s"></div>
			<div className="squarex2 animate__animated animate__fadeIn animate__delay-2s animate__slower 3s"></div>
	</div>
)

export default Background;

