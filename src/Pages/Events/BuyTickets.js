import React, { useState, useReducer } from 'react';

const reducerFunction = (state, action) => {
	switch (action.type) {
		case 'increment':
			return {
				...state,
				count: state.count + 1
			};
		case 'decrement':
			return {
				...state,
				count: state.count - 1
			};
		case 'initCount':
			return {
				...state,
				count: action.payload
			};
		default:
			return state;
	}
};

const initialState = {
	count: 0
};

const BuyTickets = (props) => {
	const [ input, setInput ] = useState(1);
	const [ state, dispatch ] = useReducer(reducerFunction, initialState);
	return (
		<div>
			<h1>Buy Tickets</h1>
			<label>Quantity:</label>
			<input type="number" value={input} onChange={(e) => setInput(parseInt(e.target.value))} />
			<button onClick={() => dispatch({ type: 'initCount', payload: input })}>Initialize Counter</button>
			<p>{state.count}</p>
			<button onClick={() => dispatch({ type: 'increment' })}>increment</button>
			<button onClick={() => dispatch({ type: 'decrement' })}>decrement</button>
		</div>
	);
};

export default BuyTickets;
