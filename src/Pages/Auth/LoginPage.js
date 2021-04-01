import React from 'react';

const LoginPage = () => {
	let emailField;
	let passwordField;

	const handleSubmit = (e) => {
		e.preventDefault();
		fetch(`${process.env.REACT_APP_BACKEND}/users/login`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				email: emailField.value,
				password: passwordField.value
			})
		})
			// 2.1 If the Promise resolves, setState("successful")
			.then((res) => {
				return console.log(res.json());
			})
			// 2.1 Else if the Promise rejects, setState("unsuccessful")
			.catch((err) => {
				console.log(err);
			});
	};
	return (
		<div className="container">
			<div className="mb-3">
				<label htmlFor="exampleInputEmail1" className="form-label">
					Email address
				</label>
				<input
					type="email"
					ref={(element) => (emailField = element)}
					className="form-control"
					id="exampleInputEmail1"
					aria-describedby="emailHelp"
				/>
				<div id="emailHelp" className="form-text">
					We'll never share your email with anyone else.
				</div>
			</div>
			<div className="mb-3">
				<label htmlFor="exampleInputPassword1" className="form-label">
					Password
				</label>
				<input
					type="password"
					ref={(element) => (passwordField = element)}
					className="form-control"
					id="exampleInputPassword1"
				/>
				<div id="emailHelp" className="form-text">
					Must be atleast 8 characters and include atleast 1 uppercase letter
				</div>
			</div>
			<button onClick={handleSubmit} type="submit" className="btn btn-primary">
				Submit
			</button>
		</div>
	);
};

export default LoginPage;
