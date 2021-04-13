import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardTimePicker, KeyboardDatePicker } from '@material-ui/pickers';

const UpdateNewEvent = (props) => {
	const [ event, setEvent ] = useState();

	const [ title, updateTitle ] = useState('');
	const [ description, updateDescription ] = useState('');
	const [ host, updateHost ] = useState('');
	const [ price, updatePrice ] = useState('');
	const [ location, updateLocation ] = useState('');
	const [ image, setImage ] = useState('');
	const [ previewImg, setPreviewImg ] = useState('');
	const [ date, setDate ] = useState('');

	useEffect(() => {
		fetch(`${process.env.REACT_APP_BACKEND}/events/${props.match.params.id}`)
			.then((res) => {
				return res.json();
			})
			.then((data) => {
				setEvent(data);
			});
	}, []);

	// * This component will have four states:
	// "initial", "creating", "successful", "unsuccessful", "failed"
	const [ state, setState ] = useState('initial');
	const [ errorsState, errorsSetState ] = useState([]);

	// For the form Images
	const formData = new FormData();

	const handleDateChange = (date) => {
		setDate(date);
	};

	const handleSubmit = () => {
		const errors = [];

		// 1. Validate the fields
		if (title.length === 0) {
			errors.push('Please enter a title');
		}
		if (description.length === 0) {
			errors.push('Please enter a description');
		}
		if (host.length === 0) {
			errors.push('Please enter a host');
		}
		if (location.length === 0) {
			errors.push('Please enter a location');
		}
		if (price.length === 0) {
			errors.push('Please enter a Price');
		}

		// 1.1 If fields are invalid, setState("unsuccessful")
		if (errors.length > 0) {
			setState('failed');
			errorsSetState(errors);
		} else {
			// 1.2 If the fields are valid, setState("sending")
			// 2 Show "creating..." and invoke the fetch()
			setState('creating');

			formData.append('name', title);
			formData.append('description', description);
			formData.append('host', host);
			formData.append('price', price);
			formData.append('address', location);
			formData.append('eventImg', image);
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
			history.push('/');
		}, 1500);
	};

	return (
		<div className="container text-start" style={{ maxWidth: '600px' }}>
			<h1 className="mt-4 mb-3">Create An Event</h1>
			<div className="mb-3">
				<img
					src={event && event.eventImg}
					alt="Event"
					style={{ objectFit: 'cover', width: '100%', height: '300px', marginBottom: '16px' }}
				/>
			</div>

			<div className="mb-3">
				<label htmlFor="exampleInputTitle1" className="form-label">
					Title
				</label>
				<input
					defaultValue={event && event.name}
					placeholder={event && event.name}
					onChange={updateTitle}
					type="text"
					className="form-control"
					id="exampleInputTitle1"
					aria-describedby="titleHelp"
				/>
			</div>

			<div className="mb-3">
				<label htmlFor="exampleInputDescription1" className="form-label">
					Description
				</label>
				<textarea
					defaultValue={event && event.description}
					placeholder={event && event.description}
					onChange={updateDescription}
					rows="3"
					type="text"
					className="form-control"
					id="exampleInputDescription1"
					aria-describedby="descriptionHelp"
				/>
			</div>

			<div className="mb-3">
				<label htmlFor="exampleInputHost1" className="form-label">
					Hosted By:
				</label>
				<input
					defaultValue={event && event.host}
					placeholder={event && event.host}
					onChange={updateHost}
					type="text"
					className="form-control"
					id="exampleInputHost1"
					aria-describedby="HostHelp"
				/>
			</div>

			<div className="mb-3 d-flex">
				<div className="row" style={{ width: '100%' }}>
					<div className="col-lg-6 col-md-12">
						<MuiPickersUtilsProvider utils={DateFnsUtils}>
							<KeyboardDatePicker
								variant="inline"
								format="MM/dd/yyy"
								margin="normal"
								id="date-picker"
								defaultValue={event && event.eventDate}
								onChange={handleDateChange}
								KeyboardButtonProps={{
									'aria-label': 'change date'
								}}
							/>
							<KeyboardTimePicker
								margin="normal"
								id="time-picker"
								defaultValue={event && event.eventDate}
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
				<label htmlFor="exampleInputPrice1" className="form-label">
					Ticket Price (AED) / Guest
				</label>
				<input
					defaultValue={event && event.price}
					placeholder={event && event.price}
					onChange={updatePrice}
					type="text"
					className="form-control"
					id="exampleInputPrice1"
					aria-describedby="PriceHelp"
				/>
			</div>

			<div className="mb-3">
				<label htmlFor="exampleInputAddress1" className="form-label">
					Location
				</label>
				<input
					defaultValue={event && event.address}
					placeholder={event && event.address}
					onChange={updateLocation}
					type="text"
					className="form-control"
					id="exampleInputAddress1"
					aria-describedby="AddressHelp"
				/>
			</div>
			{state === 'creating' && <p>creating...</p>}

			{state === 'successful' && <div className="alert alert-success">Successful</div>}
			{state === 'successful' && handleTimeout()}

			{state === 'unsuccessful' && <div className="alert alert-danger">Please try again.</div>}

			{state === 'failed' && (
				<div className="alert alert-danger">
					<ul>{errorsState.map((error) => <li>{error}</li>)}</ul>
				</div>
			)}

			<button onClick={handleSubmit} type="submit" className="btn btn-primary mb-4 mt-2">
				Create
			</button>
		</div>
	);
};

export default UpdateNewEvent;
