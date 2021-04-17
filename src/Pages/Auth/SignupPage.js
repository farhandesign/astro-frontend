import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const SignupPage = ({ history }) => {
	const [ firstName, setFirstName ] = useState('');
	const [ lastName, setLastName ] = useState('');
	const [ email, setEmail ] = useState('');
	const [ password, setPassword ] = useState('');
	const [ confirmPassword, setConfirmPassword ] = useState('');
	const [ error, setError ] = useState('');

	useEffect(
		() => {
			if (localStorage.getItem('authToken')) {
				history.push('/');
			}
		},
		[ history ]
	);

	const signupHandler = async (e) => {
		e.preventDefault();

		const config = {
			header: {
				'content-Type': 'application/json'
			}
		};

		if (password !== confirmPassword) {
			setPassword('');
			setConfirmPassword('');
			setTimeout(() => {
				setError('');
			}, 5000);
			return setError('Passwords do not match');
		}

		try {
			const { data } = await axios.post(
				`${process.env.REACT_APP_BACKEND}/api/auth/register`,
				{ firstName, lastName, email, password },
				config
			);

			localStorage.setItem('authToken', data.token);
			history.push('/');
			window.location.reload();
		} catch (error) {
			setError(error.response.data.error);
			setTimeout(() => {
				setError('');
			}, 5000);
		}
	};

	return (
		<form onSubmit={signupHandler} className="container text-start mt-5" style={{ maxWidth: '600px' }}>
			<h1 className="mt-4 mb-4">Sign Up</h1>

			{error && <div className="alert alert-danger">{error}</div>}

			<div className="mb-3">
				<label htmlFor="firstName" className="form-label">
					First name:
				</label>
				<input
					type="text"
					required
					className="form-control"
					id="firstName"
					aria-describedby="firstNameHelp"
					value={firstName}
					onChange={(e) => setFirstName(e.target.value)}
				/>
			</div>

			<div className="mb-3">
				<label htmlFor="lastName" className="form-label">
					Last name:
				</label>
				<input
					type="text"
					required
					className="form-control"
					id="lastName"
					aria-describedby="lastNameHelp"
					value={lastName}
					onChange={(e) => setLastName(e.target.value)}
				/>
			</div>

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
				/>
			</div>

			<div className="mb-3">
				<label htmlFor="password" className="form-label">
					Password:
				</label>
				<input
					type="password"
					required
					className="form-control"
					id="password"
					aria-describedby="passwordHelp"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
				/>
			</div>

			<div className="mb-3">
				<label htmlFor="confirmpassword" className="form-label">
					Confirm Password:
				</label>
				<input
					type="password"
					required
					className="form-control"
					id="confirmpassword"
					aria-describedby="confirmpasswordHelp"
					value={confirmPassword}
					onChange={(e) => setConfirmPassword(e.target.value)}
				/>
			</div>

			<button type="submit" className="btn btn-primary mb-3">
				Sign up
			</button>

			<div>
				Already Have an Account? <Link to="/login">Login</Link>
			</div>
		</form>
	);
};

export default SignupPage;
