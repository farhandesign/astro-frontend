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
					<p className="card-text">{props.description}</p>
				</div>
				<ul className="list-group list-group-flush">
					<li className="list-group-item d-flex justify-content-center">
						<span
							className="col-6 d-flex align-items-center justify-content-center"
							style={{ borderRight: '1px solid #DFDFDF' }}
						>
							{formatDate(props)}
						</span>
						<span className="col-6 d-flex align-items-center justify-content-center">{props.time}</span>
					</li>
					<li className="list-group-item">Event By UserName</li>
				</ul>
				<div className="card-body">
					<Link to={props.link} className="card-link">
						Card link
					</Link>
				</div>
			</div>
		</div>
	);
};

export default Card;
