import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const LoginPage = ({ history }) => {
	const [ email, setEmail ] = useState('');
	const [ password, setPassword ] = useState('');
	const [ error, setError ] = useState('');

	useEffect(
		() => {
			if (localStorage.getItem('authToken')) {
				history.push('/');
			}
		},
		[ history ]
	);

	const loginHandler = async (e) => {
		e.preventDefault();

		const config = {
			headers: {
				'content-Type': 'application/json'
			}
		};

		try {
			const { data } = await axios.post(
				`${process.env.REACT_APP_BACKEND}/api/auth/login`,
				{ email, password },
				config
			);

			localStorage.setItem('authToken', data.token);
			history.push('/');
		} catch (error) {
			setError(error.response.data.error);
			setTimeout(() => {
				setError('');
			}, 5000);
		}
	};

	return (
		<form onSubmit={loginHandler} className="container text-start mt-5" style={{ maxWidth: '600px' }}>
			<h1 className="mt-4 mb-4">Login</h1>

			{error && <div className="alert alert-danger">{error}</div>}

			<div className="mb-3">
				<label htmlFor="email" className="form-label">
					Email:
				</label>
				<input
					type="email"
					required
					className="form-control"
					id="email"
					aria-describedby="emailHelp"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					tabIndex={1}
				/>
			</div>

			<div className="mb-3">
				<label htmlFor="password" className="form-label">
					Password:
					<Link to="/forgotpassword" tabIndex={4}>
						Forgot Password?
					</Link>
				</label>
				<input
					type="password"
					required
					className="form-control"
					id="password"
					aria-describedby="passwordHelp"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					tabIndex={2}
				/>
			</div>

			<button type="submit" className="btn btn-primary" tabIndex={3}>
				Login
			</button>

			<div>
				Don't an Account? <Link to="/signup">Sign up</Link>
			</div>
		</form>
	);
};

export default LoginPage;
