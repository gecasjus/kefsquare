import React from 'react';
import './ImageLinkForm.css';


const ImageLinkForm = ({ onInputChange, onButtonSubmit }) => {
	return (
		<div>
			<div className='imagelink center'>
				<input className='f4 pa2 w-100' type='text' placeholder="enter image address" onChange={onInputChange} />
				</div>
			</div>
		);
}

export default ImageLinkForm;




