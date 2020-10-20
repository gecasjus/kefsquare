import React from 'react';
import './FaceRecognition.css';

const FaceRecognition = ({imageUrl, boxes}) => {
	return (
		<div className='inputimage'>
			<div className='absolute'>
				<img id='inputimage' src={imageUrl}  />
				{
					boxes.map((box, i) => {
						const { topRow, rightCol, bottomRow, leftCol } = box;
						return (<div key={i} id="face" className="bounding-box" style={{top:topRow, right:rightCol, bottom:bottomRow, left:leftCol}}></div>)
					})	
				}
			</div>
		</div>
		);
}

export default FaceRecognition;