import React, { useState } from 'react';

import 'date-fns';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardTimePicker, KeyboardDatePicker } from '@material-ui/pickers';

const CreateEvent = () => {
	const [ selectedDate, setSelectedDate ] = useState(new Date(Date.now()));
	const handleDateChange = (date) => {
		setSelectedDate(date);
	};

	// * This component will have four states:
	// "initial", "creating", "successful", "unsuccessful", "failed"
	const [ state, setState ] = useState('initial');
	const [ errorsState, errorsSetState ] = useState([]);

	let titleField;
	let descriptionField;
	let addressField;

	// For the form Images
	const formData = new FormData();

	const attachFile = (evt) => {
		const files = Array.from(evt.target.files);

		files.forEach((file, index) => {
			formData.append(index, file);
		});
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
		// 1.1 If fields are invalid, setState("unsuccessful")
		if (errors.length > 0) {
			setState('failed');
			errorsSetState(errors);
		} else {
			// 1.2 If the fields are valid, setState("sending")
			// 2 Show "creating..." and invoke the fetch()
			setState('creating');

			formData.append('name', titleField.value);
			formData.append('description', descriptionField.value);
			formData.append('address', addressField.value);
			formData.append('eventDate', selectedDate);

			fetch('http://localhost:3500/events/create-event', {
				method: 'POST',
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

	return (
		<div className="container text-start" style={{ maxWidth: '600px' }}>
			<h1 className="mt-4 mb-3">Create An Event</h1>

			<div className="mb-3">
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
					ref={(element) => (titleField = element)}
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
					rows="3"
					type="text"
					ref={(element) => (descriptionField = element)}
					className="form-control"
					id="exampleInputDescription1"
					aria-describedby="descriptionHelp"
				/>
			</div>

			<div className="mb-3 d-flex">
				<MuiPickersUtilsProvider utils={DateFnsUtils}>
					<Grid container justify="space-between">
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
						<KeyboardTimePicker
							variant="inline"
							margin="normal"
							id="time-picker"
							label="Pick A Time"
							value={selectedDate}
							onChange={handleDateChange}
							KeyboardButtonProps={{
								'aria-label': 'change date'
							}}
						/>
					</Grid>
				</MuiPickersUtilsProvider>
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
				/>
			</div>

			{state !== 'creating' &&
			state !== 'successful' && (
				<button onClick={create} type="submit" className="btn btn-primary mb-4">
					Create
				</button>
			)}

			{state === 'creating' && <p>creating...</p>}

			{state === 'successful' && <div className="alert alert-success">Successful</div>}

			{state === 'unsuccessful' && <div className="alert alert-danger">Please try again.</div>}

			{state === 'failed' && (
				<div className="alert alert-danger">
					<ul>{errorsState.map((error) => <li>{error}</li>)}</ul>
				</div>
			)}
		</div>
	);
};

export default CreateEvent;
