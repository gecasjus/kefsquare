import React from 'react';
import './Logo.css';
import LogoPic from './logopic.png';
import Square from './square.png';


const section = [{ image:require('./square.png')}, { image:require('./logopic.png')}];

       
class Logo extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			images: [],
			clickCount: section.length
			}
		}

handleImagePopulating = () => {
	if(this.state.clickCount) {
		this.setState({
			images:
			[...this.state.images, section
			[this.state.clickCount-1]],
			clickCount:
			this.state.clickCount - 1});
		}
	}

render() {
	return (
		<div className="logo">
      			<h1 className="kef" onClick={this.handleImagePopulating} className="title">kefsquare
      			</h1>
      			{this.state.images.length ?
      				this.state.images.map((image,i) => 
      					<img className="fc" src={image.image} />
      			) : "View demo by clicking"}
      			</div>
      		)
     }		
}

export default Logo;