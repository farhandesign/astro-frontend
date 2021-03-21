import React from 'react';
import './Card.css';

const Card = (props) => {
	return (
		<div className="col-lg-4 col-md-6 col-sm-12 my-3">
			<div className="card">
				<img style={{ width: '100%' }} src={props.imgSrc} className="card-img-top" alt="..." />
				<div className="card-body">
					<h5 className="card-title">{props.title}</h5>
					<p className="card-text">{props.description}</p>
				</div>
				<ul className="list-group list-group-flush">
					<li className="list-group-item">An item</li>
					<li className="list-group-item">A second item</li>
				</ul>
				<div className="card-body">
					<a href="#" className="card-link">
						Card link
					</a>
				</div>
			</div>
		</div>
	);
};

export default Card;
