import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

const DeleteEvent = (props) => {
	const [ state, setState ] = useState('initial');

	let history = useHistory();

	console.log(props);
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
		<div>
			<button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
				Delete Event
			</button>

			<div
				class="modal fade"
				id="exampleModal"
				tabindex="-1"
				aria-labelledby="exampleModalLabel"
				aria-hidden="true"
			>
				<div class="modal-dialog modal-dialog-centered">
					<div class="modal-content">
						<div class="modal-body">
							<h5 class="modal-title" id="exampleModalLabel">
								Are you sure you want to delete this event?
							</h5>
						</div>
						<div class="modal-footer">
							<button
								onClick={handleDelete}
								type="button"
								class="btn btn-primary"
								data-bs-dismiss="modal"
							>
								Yes I'm Sure
							</button>
							<button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
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
