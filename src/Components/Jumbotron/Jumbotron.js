import React from 'react';
import './Jumbotron.css';
import ButtonA from '../Buttons/ButtonA';

const Jumbotron = () => {
	return (
		<div className="custom__jumbotron-container d-flex align-items-center">
			<div className="jumbotron__bg" />
			<div className="container">
				<div className="row d-flex justify-content-center">
					<div className="jumbotron__content col-lg-6 col-md-10 col-sm-12 text-center d-flex flex-column align-items-center">
						<h1 className="jumbotron__h mb-4">YOUR EVENT ONE CLICK AWAY</h1>
						<p className="jumbotron__p mb-4">
							Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec malesuada, augue non auctor
							pellentesque, lectus nunc dignissim diam, non condimentum magna lorem vitae eros.
						</p>
						<ButtonA />
					</div>
				</div>
			</div>
		</div>
	);
};

export default Jumbotron;
