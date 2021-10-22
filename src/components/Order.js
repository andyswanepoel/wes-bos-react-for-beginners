import React, { Component } from 'react';
import { formatPrice } from '../helpers';
import { TransitionGroup, CSSTransition} from 'react-transition-group';


class Order extends Component {
	handleClick = (event) => {
		this.props.removeFromOrder(event.currentTarget.getAttribute("index"));
	}

	handleOrderChange = (event) => {
		const key = event.currentTarget.getAttribute("index");
		const action = event.currentTarget.getAttribute("data-order")
		if (action === "add") {
			this.props.addToOrder(key);
		} else {
			this.props.decreaseQuantityOfOrder(key);
		}
	}

	renderOrder = key => {
		const fish = this.props.fishes[key];
		const count = this.props.order[key];
		const isAvailable = fish && fish.status === "available";
		if (!fish) return null;
		if (!isAvailable) {
			return (
				<CSSTransition classNames="order" key={fish} timeout={{enter: 500, exit: 500}}>
					<li key={key}>
						Sorry, {fish ? fish.name : "fish"} is unavailable.
						<button index={key} onClick={this.handleClick}>X</button>
					</li>
				</CSSTransition>
			)
		}
		return (
			<CSSTransition classNames="order" key={key} timeout={{enter: 500, exit: 500}}>
				<li key={key}>
					<span>
						<TransitionGroup component="span" className="count">
						<button index={key} onClick={this.handleOrderChange} className="increment increment-minus" data-order="substract" index={key}>-</button>
							<CSSTransition classNames="count" key={count} timeout= {{enter: 500, exit: 500	}}>
								<span>{count}</span> 
							</CSSTransition>
						<button onClick={this.handleOrderChange} className="increment increment-plus" data-order="add" index={key}>+</button>
						</TransitionGroup>
						&nbsp;lbs of {fish.name} 
						
						<button index={key} onClick={this.handleClick}>&times;</button>

					</span>
					<span className="price">{formatPrice(count * fish.price)}</span>
				</li>
			</CSSTransition>
		)
	}
	render() { 
		const orderIds = Object.keys(this.props.order);
		const total = orderIds.reduce((prevTotal, key) => {
			const fish = this.props.fishes[key];
			const count = this.props.order[key];
			const isAvailable = fish && fish.status === "available";
			if (isAvailable) {
				return prevTotal + count * fish.price;
			}
			return prevTotal;
		}, 0);
		return (
			<div className="order-wrap">
				<h2>Order</h2>
				<TransitionGroup component="ul" className="order">
					{orderIds.map(this.renderOrder)}
				</TransitionGroup>
				<div className="total">
					Total: <strong>{formatPrice(total)}</strong>
				</div>
			</div>
		  );
	}
}
 
export default Order;