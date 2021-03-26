import React from 'react';
import './ButtonB.css';
import { Link } from 'react-router-dom';

const ButtonB = (props) => {
	return (
		<Link className="nav-link btn btn-secondary active button__b" to="/create-event">
			Create An Event
		</Link>
	);
};

export default ButtonB;
