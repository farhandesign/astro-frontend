import React, { useState } from 'react';
import axios from 'axios';

const ForgotPassword = () => {
	const [ email, setEmail ] = useState('');
	const [ error, setError ] = useState('');
	const [ success, setSuccess ] = useState('');

	const forgotPasswordHandler = async (e) => {
		e.preventDefault();

		const config = {
			headers: {
				'content-Type': 'application/json'
			}
		};

		try {
			const { data } = await axios.post(
				`${process.env.REACT_APP_BACKEND}/api/auth/forgotpassword`,
				{ email },
				config
			);

			setSuccess(data.data);
		} catch (error) {
			setError(error.response.data.error);
			setEmail('');
			setTimeout(() => {
				setError('');
			}, 5000);
		}
	};

	return (
		<div>
			<form onSubmit={forgotPasswordHandler} className="container text-start mt-5" style={{ maxWidth: '600px' }}>
				<h1 className="mt-4 mb-4">Forgot Password</h1>
				{error && <div className="alert alert-danger">{error}</div>}
				{success && <div className="alert alert-success">{success}</div>}

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

				<button type="submit" className="btn btn-primary">
					Send Reset Password Email
				</button>
			</form>
		</div>
	);
};

export default ForgotPassword;
