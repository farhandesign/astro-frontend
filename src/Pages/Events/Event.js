import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import DeleteEvent from './DeleteEvent';
import './Event.css';
import { FacebookShareButton, TwitterShareButton, WhatsappShareButton } from 'react-share';
import { FacebookIcon, TwitterIcon, WhatsappIcon } from 'react-share';
import HelmetMetaData from './HelmetMetaData';

import { MdDateRange } from 'react-icons/md';
import { FaTicketAlt } from 'react-icons/fa';
import { ImLocation } from 'react-icons/im';
import { GoOrganization } from 'react-icons/go';

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
				{event &&
					event.map((e) => {
						return (
							<div key={e._id}>
								<HelmetMetaData title={e.name} eventId={e._id} />
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
											<MdDateRange className="react__icons" size="1.3em" color="#8C939D" />
											{e.eventDate && e.eventDate.slice(0, 10).split('-').reverse().join('-')} at
											{e.eventDate && e.eventDate.slice(15, 21).split('-').reverse().join('-')}
										</li>
										<li className="list-group-item">
											<FaTicketAlt className="react__icons" size="1.3em" color="#8C939D" /> Price:{' '}
											{e.price} AED / Guest
										</li>

										<li className="list-group-item">
											<Link to={`/buy/${e._id}`} price={e.price}>
												Buy Tickets
											</Link>
										</li>

										<li className="list-group-item">
											<ImLocation className="react__icons" size="1.3em" color="#8C939D" />{' '}
											Location: {e.address}
										</li>
										<li className="list-group-item">
											<GoOrganization className="react__icons" size="1.3em" color="#8C939D" />
											Hosted By: {e.host}
										</li>
									</ul>
									<div className="card-footer">
										<span style={{ marginRight: '10px' }}>Share On:</span>
										<FacebookShareButton
											className="share__icon"
											url={`https://astro-events-frontend.herokuapp.com/events/${props.match
												.params.id}`}
											quote={e.name}
										>
											<FacebookIcon size={30} round={true} />
										</FacebookShareButton>
										<TwitterShareButton
											className="share__icon"
											url={`https://astro-events-frontend.herokuapp.com/events/${props.match
												.params.id}`}
											quote={e.name}
										>
											<TwitterIcon size={30} round={true} />
										</TwitterShareButton>
										<WhatsappShareButton
											className="share__icon"
											url={`https://astro-events-frontend.herokuapp.com/events/${props.match
												.params.id}`}
											quote={e.name}
										>
											<WhatsappIcon size={30} round={true} />
										</WhatsappShareButton>
									</div>
								</div>
							</div>
						);
					})}
			</div>
		</div>
	);
};

export default Event;
