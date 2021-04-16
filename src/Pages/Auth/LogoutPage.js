import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import AuthContext from '../../context/auth-context';

const LogoutPage = () => {
	let history = useHistory();
	const { setUser } = useContext(AuthContext);

	const logoutHandler = () => {
		localStorage.removeItem('authToken');
		setUser(null);
		history.push('/');
	};

	return (
		<div>
			<h1>Are you sure you want to logout?</h1>
			<button className="nav-link" onClick={logoutHandler}>
				Logout
			</button>
		</div>
	);
};

export default LogoutPage;
