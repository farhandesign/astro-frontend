import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

const DeleteEvent = (props) => {
	const [ state, setState ] = useState('initial');

	let history = useHistory();

	const handleDelete = () => {
		fetch(`http://localhost:3500/events/delete/${props.match.params.id}`, {
			method: 'DELETE'
		})
			// 2.1 If the Promise resolves, setState("successful")
			.then(() => {
				setState('successful');
			})
			.then(() => {
				history.push('/');
			})
			// 2.1 Else if the Promise rejects, setState("unsuccessful")
			.catch(() => {
				setState('unsuccessful');
			});
	};
	return (
		<div className="mb-2">
			<button type="button" className="btn btn-danger" data-bs-toggle="modal" data-bs-target="#exampleModal">
				Delete Event
			</button>

			<div
				className="modal fade"
				id="exampleModal"
				tabIndex="-1"
				aria-labelledby="exampleModalLabel"
				aria-hidden="true"
			>
				<div className="modal-dialog modal-dialog-centered">
					<div className="modal-content">
						<div className="modal-body">
							<h5 className="modal-title" id="exampleModalLabel">
								Are you sure you want to delete this event?
							</h5>
						</div>
						<div className="modal-footer">
							<button
								onClick={handleDelete}
								type="button"
								className="btn btn-primary"
								data-bs-dismiss="modal"
							>
								Yes I'm Sure
							</button>
							<button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
								Cancel
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default DeleteEvent;
