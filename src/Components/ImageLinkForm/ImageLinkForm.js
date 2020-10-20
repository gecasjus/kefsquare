import React from 'react';
import './ImageLinkForm.css';


const ImageLinkForm = ({ onInputChange, onButtonSubmit }) => {
	return (
		<div>
			<div className='center'>
				<input className='f4 pa2 w-100' type='text' onChange={onInputChange} />
				</div>
			</div>
		);
}

export default ImageLinkForm;




