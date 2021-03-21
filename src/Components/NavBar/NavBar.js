import React from 'react';
import './NavBar.css';
import ButtonB from '../Buttons/ButtonB';

const NavBar = (props) => {
	return (
		<nav className="navbar navbar-expand-lg navbar-dark" style={{ background: '#1F2128' }}>
			<div className="container-fluid container-lg">
				<a className="navbar-brand custom__logo" href="#">
					evently
				</a>
				<button
					className="navbar-toggler"
					type="button"
					data-bs-toggle="collapse"
					data-bs-target="#navbarNav"
					aria-controls="navbarNav"
					aria-expanded="false"
					aria-label="Toggle navigation"
				>
					<span className="navbar-toggler-icon" />
				</button>
				<div className="collapse navbar-collapse" id="navbarNav">
					<ul className="navbar-nav">
						<li className="nav-item mx-3">
							<a className="nav-link active" aria-current="page" href="#">
								{props.links[0]}
							</a>
						</li>
						<li className="nav-item">
							<ButtonB />
						</li>
					</ul>
					<ul className="navbar-nav" style={{ marginLeft: 'auto' }}>
						<li className="nav-item">
							<a className="nav-link" aria-current="page" href="#">
								Login
							</a>
						</li>
						<li className="nav-item">
							<a className="nav-link" href="#">
								Sign up
							</a>
						</li>
						{/* <li className="nav-item">
							<a className="nav-link" href="#">
								Sign out
							</a>
						</li> */}
					</ul>
				</div>
			</div>
		</nav>
	);
};

export default NavBar;
