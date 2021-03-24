import React, { useState, useEffect } from 'react';
import Card from '../Card/Card';
import { Link } from 'react-router-dom';

const CardSection = () => {
	const [ events, setEvents ] = useState(null);
	useEffect(() => {
		fetch('http://localhost:3500/events')
			.then((res) => {
				return res.json();
			})
			.then((data) => {
				setEvents(data);
			});
	}, []);

	return (
		<div className="container py-5">
			<div className="row">
				<div className="col-12">
					<h1>Latest Events</h1>
				</div>
				{events &&
					events
						.map((event) => {
							return (
								<Card
									key={event._id}
									title={event.name}
									imgSrc={event.eventImg}
									description={event.description}
									location={event.address}
									date={event.eventDate.slice(0, 15)}
									time={event.eventDate.slice(15, 33)}
									link={`/events/${event._id}`}
								/>
							);
						})
						.reverse()
						.slice(0, 6)}
			</div>
			<Link to="/events">Show More</Link>
		</div>
	);
};

export default CardSection;
