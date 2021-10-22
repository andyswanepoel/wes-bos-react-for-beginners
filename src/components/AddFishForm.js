import React, { Component } from 'react';

class AddFishForm extends Component {
	nameRef = React.createRef();
	priceRef = React.createRef();
	statusRef = React.createRef();
	descRef = React.createRef();
	imageRef = React.createRef();

	createFish = (event) => {
		// 1. Stop form from submitting
		event.preventDefault();

		// 2. Create fish object from the inputs
		const fish = {
			name: this.nameRef.current.value,
			price: parseFloat(this.priceRef.current.value) || 0,
			status: this.statusRef.current.value,
			desc: this.descRef.current.value,
			image: this.imageRef.current.value
		}
		this.props.addFish(fish);
		event.currentTarget.reset();
	}
	render() { 
		return (  
			<form className="fish-edit" onSubmit={this.createFish}>
				<input name="name" ref={this.nameRef} type="text" placeholder="name" />
				<input name="price" ref={this.priceRef} type="text"placeholder="price" />
				<select name="status" ref={this.statusRef} placeholder="status">
					<option value="available">Fresh!</option>
					<option value="unavailable">Sold Out!</option>
				</select>
				<textarea name="desc" ref={this.descRef} placeholder="desc"></textarea>
				<input name="image" ref={this.imageRef} type="text"placeholder="image" />
				<button type="submit">+ Add fish</button>
			</form>
		);
	}
}
 
export default AddFishForm;