import React from 'react';
import './Card.css';
import { Link } from 'react-router-dom';

const Card = (props) => {
	const formatDate = (props) => {
		return props.date.slice(0, 10).split('-').reverse().join('-');
	};
	return (
		<div className="col-lg-4 col-md-6 col-sm-12 my-3">
			<div className="card">
				<img
					style={{ width: '100%', height: '300px', objectFit: 'cover' }}
					src={props.imgSrc}
					className="card-img-top"
					alt="..."
				/>
				<div className="card-body">
					<h5 className="card-title">{props.title}</h5>
					<p className="card-text" style={{ height: '50px' }}>
						{props.description.slice(0, 100)} ...
					</p>
				</div>
				<ul className="list-group list-group-flush">
					<li className="list-group-item">
						{props.date && formatDate(props)} at {props.time}
					</li>
					<li className="list-group-item">{props.price} AED / Guest</li>
					<li className="list-group-item">Hosted By: {props.host}</li>
				</ul>
				<div className="card-body">
					<Link to={props.link} className="card-link">
						View Event
					</Link>
				</div>
			</div>
		</div>
	);
};

export default Card;
