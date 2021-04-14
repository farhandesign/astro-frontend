import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PrivatePage = ({ history }) => {
	const [ error, setError ] = useState('');
	const [ privateData, setPrivateData ] = useState('');

	useEffect(
		() => {
			if (!localStorage.getItem('authToken')) {
				history.push('/login');
			}
			const fetchPrivateData = async () => {
				const config = {
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer ${localStorage.getItem('authToken')}`
					}
				};

				try {
					const { data } = await axios.get(`${process.env.REACT_APP_BACKEND}/api/private`, config);
					setPrivateData(data.data);
				} catch (error) {
					localStorage.removeItem('authToken');
					setError('You are not authorized. Please login');
				}
			};
			fetchPrivateData();
		},
		[ history ]
	);

	const logoutHandler = () => {
		localStorage.removeItem('authToken');
		history.push('/login');
	};

	return error ? (
		<div className="alert alert-danger">{error}</div>
	) : (
		<div>
			{privateData}
			<button onClick={logoutHandler}>Logout</button>
		</div>
	);
};

export default PrivatePage;
