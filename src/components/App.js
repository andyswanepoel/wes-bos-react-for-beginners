import React from 'react';
import Header from './Header';
import Order from './Order';
import Inventory from './Inventory';
import sampleFishes from '../sample-fishes';
import Fish from './Fish';
import base from '../base';

class App extends React.Component {
	state = {
		fishes: {},
		order: {}
	}

	componentDidMount() {
		const { params } = this.props.match;
		// First reinstate local storage
		const localStorageRef = localStorage.getItem(params.storeId);
		if (localStorageRef) {
			this.setState({
				order: JSON.parse(localStorageRef)
			})
		}
		this.ref = base.syncState(`${params.storeId}/fishes`, {
			context: this,
			state: "fishes"
		});
	}

	componentDidUpdate() {
		localStorage.setItem(this.props.match.params.storeId, JSON.stringify(this.state.order));
	}

	componentWillUnmount() {
		base.removeBinding(this.ref);
	}

	addFish = fish => {
		// 1. Take a copy of the existing state
		// Avoids mutating the object
		const fishes = { ...this.state.fishes };
		// 2. Add new fish to copied fishes object
		fishes[`fish${Date.now()}`] = fish;
		// 3. Set the new fishes object to state
		this.setState({ fishes });
	}

	updateFish = (key, updateFish) => {
		// 1. Take a copy of the existing state
		// Avoids mutating the object
		const fishes = { ...this.state.fishes };
		// 2. Add new fish to copied fishes object
		fishes[key] = updateFish;
		// 3. Set the new fishes object to state
		this.setState({ fishes });
	}

	deleteFish = (key) => {
		// 1. Take a copy of the existing state
		// Avoids mutating the object
		const fishes = { ...this.state.fishes };
		// 2. Add new fish to copied fishes object
		fishes[key] = null;
		// 3. Set the new fishes object to state
		this.setState({ fishes });
	}

	addToOrder = (key) => {
		// 1. Take a copy of the existing state
		// Avoids mutating the object
		const order = { ...this.state.order };
		// 2. Either add to the order or update the number in the order
		order[key] = order[key] + 1 || 1;
		// 3. Set the new order object to state
		this.setState({ order });
	}

	decreaseQuantityOfOrder = (key) => {
		// 1. Take a copy of the existing state
		// Avoids mutating the object
		const order = { ...this.state.order };
		// 2. Either add to the order or update the number in the order
		order[key] = order[key] - 1;
		// if removing the last quantity, delete it from order
		if (order[key] === 0) delete order[key];
		// 3. Set the new order object to state
		this.setState({ order });
	}

	removeFromOrder = (key) => {
		// 1. Take a copy of the existing state
		// Avoids mutating the object
		const order = { ...this.state.order };
		// 2. Remove that item from order
		delete order[key];
		// 3. Set the new order object to state
		this.setState({ order });
	}

	loadSampleFishes = () => {
		this.setState({
			fishes: sampleFishes
		})
	}
	render() { 
		return (  
			<div className="catch-of-the-day">
				<div className="menu">
					<Header tagline="Fresh Seafood Market"/>
					<ul className="fishes">
						{ Object.keys(this.state.fishes).map(key => (
							<Fish 
								key={key} 
								index={key}
								details={this.state.fishes[key]} 
								addToOrder={this.addToOrder}
							/>
								) 
							) 
						}
					</ul>
				</div>
				<Order 
					fishes={this.state.fishes} 
					order={this.state.order}
					addToOrder={this.addToOrder}
					decreaseQuantityOfOrder={this.decreaseQuantityOfOrder}
					removeFromOrder={this.removeFromOrder}/>
				<Inventory 
					addFish={this.addFish} 
					updateFish={this.updateFish}
					deleteFish={this.deleteFish}
					loadSampleFishes={this.loadSampleFishes}
					fishes={this.state.fishes}
				/>
			</div>
		);
	}
}
 
export default App;