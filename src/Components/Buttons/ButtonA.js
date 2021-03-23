import React from 'react';
import { Link } from 'react-router-dom';
import './ButtonA.css';

const ButtonA = (props) => {
	return (
		<Link to="/create-event" className="btn btn-light jumbotron__button mt-2">
			CREATE YOUR EVENT
		</Link>
	);
};

export default ButtonA;
