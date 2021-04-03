import React from 'react';
import './SkeletonElement.css';

const SkeletonElement = () => {
	return (
		<div className="col-lg-4 col-md-6 col-sm-12 my-3">
			<div className="card skeleton-card">
				<div className="skeleton-image" />
				<div className="card-body">
					<h5 className="card-title skeleton-title">Art Exhibiton</h5>
					<p className="card-text skeleton-description" style={{ height: '50px' }}>
						Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus auctor pulvin ...
					</p>
				</div>
				<ul className="list-group list-group-flush">
					<li className="list-group-item">
						<p className="skeleton-item">Sun Mar 28 at 15:33</p>
					</li>
					<li className="list-group-item">
						<p className="skeleton-item">50 AED / Guest</p>
					</li>
					<li className="list-group-item">
						<p className="skeleton-item">Hosted By: Art Events</p>
					</li>
				</ul>
				<div className="card-body">
					<p className="skeleton-item">View Event</p>
				</div>
			</div>
		</div>
	);
};

export default SkeletonElement;
