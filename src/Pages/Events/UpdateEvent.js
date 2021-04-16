import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardTimePicker, KeyboardDatePicker } from '@material-ui/pickers';

const UpdateEvent = (props) => {
	const [ event, setEvent ] = useState();
	useEffect(
		() => {
			fetch(`${process.env.REACT_APP_BACKEND}/events/${props.match.params.id}`)
				.then((res) => {
					return res.json();
				})
				.then((data) => {
					setEvent(data);
				});
		},
		[ props.match.params.id ]
	);

	const [ date, setDate ] = useState(new Date(Date.now()));

	// * This component will have four states:
	// "initial", "creating", "successful", "unsuccessful", "failed"
	const [ state, setState ] = useState('initial');
	const [ errorsState, errorsSetState ] = useState([]);

	let titleField;
	let descriptionField;
	let addressField;
	let hostField;
	let priceField;

	// For the form Images
	const formData = new FormData();

	// Select Date
	const handleDateChange = (date) => {
		setDate(date);
	};

	const create = () => {
		const errors = [];

		// 1. Validate the fields
		if (titleField.value.length === 0) {
			errors.push('Please enter a title');
		}
		if (descriptionField.value.length === 0) {
			errors.push('Please enter a description');
		}
		if (hostField.value.length === 0) {
			errors.push('Please enter a host');
		}
		if (addressField.value.length === 0) {
			errors.push('Please enter a location');
		}
		// 1.1 If fields are invalid, setState("unsuccessful")
		if (errors.length > 0) {
			setState('failed');
			errorsSetState(errors);
		} else {
			// 1.2 If the fields are valid, setState("sending")
			// 2 Show "creating..." and invoke the fetch()
			setState('creating');

			formData.append('name', titleField.value);
			formData.append('host', hostField.value);
			formData.append('description', descriptionField.value);
			formData.append('price', priceField.value);
			formData.append('address', addressField.value);
			formData.append('eventDate', date);

			fetch(`${process.env.REACT_APP_BACKEND}/events/update/${props.match.params.id}`, {
				method: 'PATCH',
				body: formData
			})
				// 2.1 If the Promise resolves, setState("successful")
				.then(() => {
					setState('successful');
				})
				// 2.1 Else if the Promise rejects, setState("unsuccessful")
				.catch(() => {
					setState('unsuccessful');
				});
		}
	};

	let history = useHistory();
	const handleTimeout = () => {
		setTimeout(() => {
			history.push(`/events/${props.match.params.id}`);
		}, 1000);
	};

	return (
		<div className="container text-start" style={{ maxWidth: '600px' }}>
			<h1 className="mt-4 mb-3">Edit Event</h1>
			<img style={{ objectFit: 'cover' }} src={event && event.eventImg} className="card-img-top" alt="..." />
			<div className="mb-3 mt-3">
				<label htmlFor="exampleInputTitle1" className="form-label">
					Title
				</label>
				<input
					ref={(element) => (titleField = element)}
					type="text"
					className="form-control"
					id="exampleInputTitle1"
					aria-describedby="titleHelp"
					placeholder={event && event.name}
					defaultValue={event && event.name}
				/>
			</div>
			<div className="mb-3">
				<label htmlFor="exampleInputDescription1" className="form-label">
					Description
				</label>
				<textarea
					rows="7"
					type="text"
					ref={(element) => (descriptionField = element)}
					className="form-control"
					id="exampleInputDescription1"
					aria-describedby="descriptionHelp"
					placeholder={event && event.description}
					defaultValue={event && event.description}
				/>
			</div>

			<div className="alert alert-danger">Please select a Date and Time again.</div>

			<div className="mb-3 d-flex">
				<div className="row" style={{ width: '100%' }}>
					<div className="col-lg-6 col-md-12">
						<MuiPickersUtilsProvider utils={DateFnsUtils}>
							<KeyboardDatePicker
								variant="inline"
								format="MM/dd/yyy"
								margin="normal"
								id="date-picker"
								label="Pick A Date"
								value={date}
								onChange={handleDateChange}
								KeyboardButtonProps={{
									'aria-label': 'change date'
								}}
							/>
							<KeyboardTimePicker
								margin="normal"
								id="time-picker"
								label="Pick A Time"
								value={date}
								onChange={handleDateChange}
								KeyboardButtonProps={{
									'aria-label': 'change date'
								}}
							/>
						</MuiPickersUtilsProvider>
					</div>
				</div>
			</div>

			<div className="mb-3">
				<label htmlFor="exampleInputHost1" className="form-label">
					Hosted By:
				</label>
				<input
					type="text"
					ref={(element) => (hostField = element)}
					className="form-control"
					id="exampleInputHost1"
					aria-describedby="HostHelp"
					placeholder={event && event.host}
					defaultValue={event && event.host}
				/>
			</div>

			<div className="mb-3">
				<label htmlFor="exampleInputPrice1" className="form-label">
					Ticket Price (AED) / Guest
				</label>
				<input
					type="text"
					ref={(element) => (priceField = element)}
					className="form-control"
					id="exampleInputPrice1"
					placeholder={event && event.price}
					defaultValue={event && event.price}
					aria-describedby="PriceHelp"
				/>
			</div>

			<div className="mb-3">
				<label htmlFor="exampleInputAddress1" className="form-label">
					Location
				</label>
				<input
					type="text"
					ref={(element) => (addressField = element)}
					className="form-control"
					id="exampleInputAddress1"
					aria-describedby="AddressHelp"
					placeholder={event && event.address}
					defaultValue={event && event.address}
				/>
			</div>

			{state !== 'creating' &&
			state !== 'successful' && (
				<button onClick={create} type="submit" className="btn btn-primary mb-4 mt-2">
					Update
				</button>
			)}

			{state === 'creating' && <p>creating...</p>}

			{state === 'successful' && <div className="alert alert-success">Successful</div>}
			{state === 'successful' && handleTimeout()}

			{state === 'unsuccessful' && <div className="alert alert-danger">Please try again.</div>}

			{state === 'failed' && (
				<div className="alert alert-danger">
					<ul>{errorsState.map((error) => <li>{error}</li>)}</ul>
				</div>
			)}
		</div>
	);
};

export default UpdateEvent;
