import React, { useState, useEffect } from 'react';

import StripeCheckout from 'react-stripe-checkout';

const PaymentPage = (props) => {
	const [ quantity, setQuantity ] = useState(1);
	const [ event, setEvent ] = useState();
	let eventId = props.match.params.id;

	console.log(event);

	useEffect(() => {
		fetch(`${process.env.REACT_APP_BACKEND}/events/${eventId}`)
			.then((res) => {
				return res.json();
			})
			.then((data) => {
				setEvent(data);
			});
	}, []);

	const makePayment = (token) => {
		const body = {
			token,
			event
		};
		const headers = {
			'Content-Type': 'application/json'
		};
		return fetch(`${process.env.REACT_APP_BACKEND}/payment/${event}`, {
			method: 'POST',
			headers,
			body: JSON.stringify(body)
		})
			.then((response) => {
				console.log('RESPONSE', response);
				const { status } = response;
				console.log('STATUS', status);
			})
			.catch((error) => console.log(error));
	};

	const handleIncrease = () => {
		setQuantity(quantity + 1);
	};
	const handleDecrease = () => {
		setQuantity(quantity - 1);
	};

	return (
		<div className="container text-start mt-5">
			<ul className="list-group justify-content-center">
				<li className="list-group-item" style={{ background: '#1F2128', color: 'white' }} aria-current="true">
					CHECKOUT
				</li>
				<li
					className="list-group-item d-flex align-items-center justify-content-between"
					style={{ height: '72px' }}
				>
					{event && event.name}
					<button onClick={handleIncrease}>{event && event.price * quantity}</button>
					{quantity > 1 && <button onClick={handleDecrease}>{event && event.price / quantity}</button>}
				</li>
				<li
					className="list-group-item list-group-item-dark text-end"
					style={{ background: '#F7F7F7' }}
					aria-current="true"
				>
					<StripeCheckout
						stripeKey={process.env.REACT_APP_STRIPE}
						token={makePayment}
						name="Buy Ticket"
						amount={event && event.price * quantity * 100}
					>
						<button
							className="btn btn-warning"
							style={{ marginLeft: '16px', borderRadius: '50px', padding: '5px 20px' }}
						>
							Buy Now
						</button>
					</StripeCheckout>
				</li>
			</ul>
		</div>
	);
};

export default PaymentPage;
