import React, { useContext, useEffect } from 'react';
import { Route } from 'react-router-dom';
import NavBar from '../Components/NavBar/NavBar';

import AuthContext from '../context/auth-context';

const LayoutRoute = (props) => {
	const { setUser } = useContext(AuthContext);

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
		<div>
			<NavBar links={[ 'Events', 'Create An Event' ]} />
			<div className="content" style={{ minHeight: 'calc(100vh - 112px)' }}>
				<Route path={props.path} exact={props.exact} component={props.component} />
			</div>
		</div>
	);
};
export default LayoutRoute;
