import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import DeleteEvent from './DeleteEvent';

const Event = (props) => {
	const [ event, setEvent ] = useState();

	useEffect(() => {
		fetch(`http://localhost:3500/events/${props.match.params.id}`)
			.then((res) => {
				return res.json();
			})
			.then((data) => {
				setEvent([ data ]);
			});
	}, []);
	return (
		<div className="container text-center">
			<div className="row d-flex justify-content-center">
				{event &&
					event.map((e) => {
						return (
							<div key={e._id}>
								<div
									className="d-flex justify-content-center mt-3"
									style={{
										width: '100%',
										maxHeight: '500px',
										background: '#E6E2EA',
										borderRadius: '8px',
										overflow: 'hidden'
									}}
								>
									<img
										style={{ objectFit: 'cover' }}
										src={e.eventImg}
										className="card-img-top"
										alt="..."
									/>
								</div>

								<div className="row mt-4 text-start">
									<div className="col-12 d-flex justify-content-between align-items-center mb-3">
										<h1>{e.name}</h1>
										<Link to={`/events/update/${e._id}`} className="btn btn-outline-primary mb-2">
											Edit Event
										</Link>
									</div>

									<p>{e.description}</p>
									<p>{e.eventDate && e.eventDate.slice(0, 10).split('-').reverse().join('-')}</p>
									<p>{e.time}</p>
									<p>{e.price} AED / Guest</p>
									<p>{e.address}</p>
									<p>Hosted By: {e.host}</p>
								</div>

								<DeleteEvent {...props} />
							</div>
						);
					})}
			</div>
		</div>
	);
};

export default Event;
