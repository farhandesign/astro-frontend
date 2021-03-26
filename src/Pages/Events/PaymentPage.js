import React, { useState, useEffect } from 'react';

import StripeCheckout from 'react-stripe-checkout';

const PaymentPage = (props) => {
	const [ product, setProduct ] = useState({
		price: 0
	});
	let event = props.match.params.id;

	useEffect(() => {
		fetch(`${process.env.REACT_APP_BACKEND}/events/${event}`)
			.then((res) => {
				return res.json();
			})
			.then((data) => {
				setProduct(data);
			});
	}, []);

	const makePayment = (token) => {
		const body = {
			token,
			product
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

	return (
		<div className="container text-start mt-5">
			<ul className="list-group justify-content-center">
				<li className="list-group-item" style={{ background: '#1F2128', color: 'white' }} aria-current="true">
					CHECKOUT
				</li>
				<li className="list-group-item d-flex align-items-center" style={{ height: '72px' }}>
					{product.name} {product.price}
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
						amount={product.price * 100}
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
