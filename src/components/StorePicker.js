import React from 'react';
import { getFunName } from '../helpers'

class StorePicker extends React.Component {
	myInput = React.createRef();

	goToStore = (event) => {
		// 1. Prevent default submit
		event.preventDefault();
		// 2. Get input value
		const storeName = this.myInput.current.value;
		// 3. Change page to /store/input-value
		this.props.history.push(`store/${storeName}`);
	}
	render() {
		return (
			<form className="store-selector" onSubmit={this.goToStore}>
				<h2>Please Enter a Store</h2>
				<input 
					type="text" 
					ref={this.myInput}
					required 
					placeholder="Store Name" 
					defaultValue={getFunName()}
					/>
				<button type="submit">Visit Store &#8594;</button>
			</form>
		)
	}
}

export default StorePicker;