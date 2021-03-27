import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';

const UpdateEvent = (props) => {
	const [ event, setEvent ] = useState();
	const [ eventImage, setEventImage ] = useState();
	useEffect(() => {
		fetch(`${process.env.REACT_APP_BACKEND}/events/${props.match.params.id}`)
			.then((res) => {
				return res.json();
			})
			.then((data) => {
				setEvent(data);
				setEventImage(data.eventImg);
			});
	}, []);

	const [ selectedDate, setSelectedDate ] = useState(new Date(Date.now()));
	let timeArr = [ '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12' ];
	let minArr = [ '00', '15', '30', '45' ];

	// * This component will have four states:
	// "initial", "creating", "successful", "unsuccessful", "failed"
	const [ state, setState ] = useState('initial');
	const [ errorsState, errorsSetState ] = useState([]);

	let titleField;
	let descriptionField;
	let addressField;
	let hostField;
	let hourField;
	let timePeriodField;
	let minField;
	let priceField;

	// For the form Images
	const formData = new FormData();
	// Attach File
	const attachFile = (evt) => {
		const files = Array.from(evt.target.files);

		console.log(evt.target.files);
		files.forEach((file, index) => {
			formData.append(index, file);
		});
	};

	// Select Date
	const handleDateChange = (date) => {
		const theTimestamp = Date.parse(date);
		const theDate = new Date(theTimestamp);
		// `${theDate.getDay()}/${theDate.getMonth()}/${theDate.getFullYear()}`;

		formData.append('eventDate', theDate.toUTCString());
		// setSelectedDate(date);
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
			let totalTime = hourField.value + minField.value + timePeriodField.value;

			formData.append('name', titleField.value);
			formData.append('host', hostField.value);
			formData.append('description', descriptionField.value);
			formData.append('price', priceField.value);
			formData.append('address', addressField.value);
			formData.append('time', totalTime);

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
			<img style={{ objectFit: 'cover' }} src={eventImage && eventImage} className="card-img-top" alt="..." />

			<div className="mb-3">
				<label htmlFor="formFile" className="form-label">
					Upload Image
				</label>
				<input onChange={attachFile} className="form-control" type="file" id="formFile" />
			</div>

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
								value={selectedDate}
								onChange={handleDateChange}
								KeyboardButtonProps={{
									'aria-label': 'change date'
								}}
							/>
						</MuiPickersUtilsProvider>
					</div>
					<div className="col-lg-6 col-md-12 d-flex">
						<select
							ref={(element) => (hourField = element)}
							type="text"
							className="form-select form-select-sm mt-4"
							aria-label=".form-select-sm example"
							style={{ width: '120px', maxHeight: '40px' }}
						>
							<option defaultValue="Hour">Hour</option>
							{timeArr &&
								timeArr.map((time) => {
									return (
										<option key={time} value={time}>
											{time}
										</option>
									);
								})}
						</select>
						<select
							ref={(element) => (minField = element)}
							type="text"
							className="form-select form-select-sm mt-4 mx-2"
							aria-label=".form-select-sm example"
							style={{ width: '120px', maxHeight: '40px' }}
						>
							<option defaultValue="Minute">Minute</option>
							{minArr &&
								minArr.map((min) => {
									return (
										<option key={min} value={':' + min}>
											{min}
										</option>
									);
								})}
						</select>

						<select
							ref={(element) => (timePeriodField = element)}
							className="form-select form-select-sm mt-4"
							aria-label=".form-select-sm example"
							style={{ width: '80px', maxHeight: '40px' }}
						>
							<option defaultValue="PM">PM</option>
							<option value="AM">AM</option>
						</select>
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
					Create
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
