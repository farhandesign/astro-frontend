import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';

import './NavBar.css';
import ButtonB from '../Buttons/ButtonB';
import AuthContext from '../../context/auth-context';

const NavBar = (props) => {
	const { user, setUser } = useContext(AuthContext);

	useEffect(
		() => {
			const config = {
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${localStorage.getItem('authToken')}`
				}
			};

			fetch(`${process.env.REACT_APP_BACKEND}/api/private`, config)
				.then((res) => {
					return res.json();
				})
				.then((data) => {
					setUser(data);
				});
		},
		[ setUser ]
	);

	return (
		<nav className="navbar navbar-expand-lg navbar-dark" style={{ background: '#1F2128' }}>
			<div className="container-fluid container-lg">
				<Link className="navbar-brand custom__logo" to="/">
					evently
				</Link>
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
							<Link className="nav-link active" aria-current="page" to="/events">
								{props.links[0]}
							</Link>
						</li>
						<li className="nav-item">
							<ButtonB />
						</li>
					</ul>

					{user && (
						<ul className="navbar-nav" style={{ marginLeft: 'auto' }}>
							<li className="nav-item">
								<Link className="nav-link" aria-current="page" to="/private">
									{user.email}
								</Link>
							</li>
							<li className="nav-item">
								<Link className="nav-link" aria-current="page" to="/logout">
									Logout
								</Link>
							</li>
						</ul>
					)}
					{!user && (
						<ul className="navbar-nav" style={{ marginLeft: 'auto' }}>
							<li className="nav-item">
								<Link className="nav-link" aria-current="page" to="/login">
									Login
								</Link>
							</li>
							<li className="nav-item">
								<Link className="nav-link" to="/signup">
									Sign up
								</Link>
							</li>
						</ul>
					)}
				</div>
			</div>
		</nav>
	);
};

export default NavBar;
