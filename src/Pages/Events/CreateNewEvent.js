import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import useInputState from '../../Hooks/useInputState';

import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardTimePicker, KeyboardDatePicker } from '@material-ui/pickers';

const CreateNewEvent = () => {
	const [ title, updateTitle, resetTitle ] = useInputState('');
	const [ description, updateDescription, resetDescription ] = useInputState('');
	const [ host, updateHost, resetHost ] = useInputState('');
	const [ price, updatePrice, resetPrice ] = useInputState('');
	const [ location, updateLocation, resetLocation ] = useInputState('');
	const [ image, setImage ] = useState('');
	const [ previewImg, setPreviewImg ] = useState('');
	const [ date, setDate ] = useState(new Date(Date.now()));

	// This component will have four states:
	// "initial", "creating", "successful", "unsuccessful", "failed"
	const [ state, setState ] = useState('initial');
	const [ errorsState, errorsSetState ] = useState([]);

	// For the form Images
	const formData = new FormData();

	const attachFile = (e) => {
		let selectedImg = e.target.files[0];
		const ALLOWED_TYPES = [ 'image/png', 'image/jpeg', 'image/jpg' ];
		if (selectedImg && ALLOWED_TYPES.includes(selectedImg.type)) {
			let reader = new FileReader();
			reader.onloadend = () => {
				setPreviewImg(reader.result);
				setImage(selectedImg);
			};
			reader.readAsDataURL(selectedImg);
		} else {
			console.log('File not supported');
		}
	};

	const handleDateChange = (date) => {
		// const theTimestamp = Date.parse(date);
		// const theDate = new Date(theTimestamp);
		// setDate(theDate.toUTCString());

		// // `${theDate.getDay()}/${theDate.getMonth()}/${theDate.getFullYear()}`;
		// formData.append('eventDate', theDate.toUTCString());
		// setSelectedDate(date);
		setDate(date);
	};

	const handleReset = () => {
		resetTitle();
		resetDescription();
		resetHost();
		resetPrice();
		resetLocation();
		setImage('');
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

			fetch(`${process.env.REACT_APP_BACKEND}/events/create-event`, {
				method: 'POST',
				body: formData
			})
				// 2.1 If the Promise resolves, setState("successful")
				.then(() => {
					handleReset();
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
				{previewImg && (
					<img
						src={previewImg}
						alt="Event"
						style={{ objectFit: 'cover', width: '100%', height: '300px', marginBottom: '16px' }}
					/>
				)}
				<label htmlFor="formFile" className="form-label">
					Upload Image
				</label>
				<input onChange={attachFile} className="form-control" type="file" id="formFile" />
			</div>

			<div className="mb-3">
				<label htmlFor="exampleInputTitle1" className="form-label">
					Title
				</label>
				<input
					value={title}
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
					value={description}
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
					value={host}
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
				<label htmlFor="exampleInputPrice1" className="form-label">
					Ticket Price (AED) / Guest
				</label>
				<input
					value={price}
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
					value={location}
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

export default CreateNewEvent;
