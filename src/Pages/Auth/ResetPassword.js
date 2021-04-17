import { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const ResetPassword = ({ match }) => {
	const [ password, setPassword ] = useState('');
	const [ confirmPassword, setConfirmPassword ] = useState('');
	const [ error, setError ] = useState('');
	const [ success, setSuccess ] = useState('');

	const resetPasswordHandler = async (e) => {
		e.preventDefault();

		const config = {
			headers: {
				'content-Type': 'application/json'
			}
		};

		if (password !== confirmPassword) {
			setPassword('');
			setConfirmPassword('');
			setTimeout(() => {
				setError('');
			}, 5000);
			return setError("Passwords don't mactch");
		}

		try {
			const { data } = await axios.put(
				`${process.env.REACT_APP_BACKEND}/api/auth/passwordreset/${match.params.resetToken}`,
				{
					password
				},
				config
			);

			setSuccess(data.data);
			window.location.reload();
		} catch (error) {
			setError(error.response.data.error);
			setTimeout(() => {
				setError('');
			}, 5000);
		}
	};
	return (
		<div>
			<form onSubmit={resetPasswordHandler} className="container text-start mt-5" style={{ maxWidth: '600px' }}>
				<h1 className="mt-4 mb-4">Forgot Password</h1>
				{error && <div className="alert alert-danger">{error}</div>}
				{success && (
					<div className="alert alert-success">
						{success} <Link to="/login">Login</Link>
					</div>
				)}

				<div className="mb-3">
					<label htmlFor="password" className="form-label">
						New Password:
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

				<button type="submit" className="btn btn-primary">
					Send Reset Password Email
				</button>
			</form>
		</div>
	);
};

export default ResetPassword;
