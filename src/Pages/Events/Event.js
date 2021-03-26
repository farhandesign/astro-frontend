import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import DeleteEvent from './DeleteEvent';
import './Event.css';
import { FacebookShareButton } from 'react-share';
import { FacebookIcon } from 'react-share';
import HelmetMetaData from './Helmet';

const Event = (props) => {
	const [ event, setEvent ] = useState();

	useEffect(() => {
		fetch(`${process.env.REACT_APP_BACKEND}/events/${props.match.params.id}`)
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
				<HelmetMetaData />
				{event &&
					event.map((e) => {
						return (
							<div key={e._id}>
								<div className="card text-start my-3" style={{ width: '100%', position: 'relative' }}>
									<div
										className="d-flex justify-content-center"
										style={{
											width: '100%',
											maxHeight: '500px',
											background: '#E6E2EA'
										}}
									>
										<img
											style={{ objectFit: 'cover' }}
											src={e.eventImg}
											className="card-img-top"
											alt="..."
										/>
									</div>
									<Link
										style={{ position: 'absolute', top: '10px', right: '10px' }}
										to={`/events/update/${e._id}`}
										className="btn btn-light"
									>
										Edit Event
									</Link>

									<div className="card-body">
										<div className="col-12 d-flex justify-content-between align-items-center mb-3">
											<h1 className="event__title">{e.name}</h1>
											<DeleteEvent {...props} />
										</div>
										<p className="card-text">{e.description}</p>
									</div>
									<ul className="list-group list-group-flush">
										<li className="list-group-item">
											{e.eventDate && e.eventDate.slice(0, 10).split('-').reverse().join('-')} at{' '}
											{e.time}
										</li>
										<li className="list-group-item">Price: {e.price} AED / Guest</li>
										<li className="list-group-item">Location: {e.address}</li>
										<li className="list-group-item">Hosted By: {e.host}</li>
										<li className="list-group-item">
											<span style={{ marginRight: '10px' }}>Share On:</span>

											<FacebookShareButton
												url={`https://astro-events-frontend.herokuapp.com/events/${props.match
													.params.id}`}
												quote={e.name}
											>
												<FacebookIcon size={30} round={true} />
											</FacebookShareButton>
										</li>
									</ul>
								</div>
							</div>
						);
					})}
			</div>
		</div>
	);
};

export default Event;
