import React from 'react';
import './rank.styles.css';


const Rank = ({name, entries}) => {
	return (
		<div className="info">
			<div className='name'>
					{name}
			</div>
			<div className='count'>
				{entries}
			<label className="entries" for="black">entries </label>
			</div>
		</div>
	);
}

export default Rank;