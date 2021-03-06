import React, { useState, useEffect } from 'react';
import Card from '../Card/Card';
import { Link } from 'react-router-dom';
import SkeletonElement from '../Skeletons/SkeletonElement';

const CardSection = () => {
	const [ events, setEvents ] = useState(null);
	useEffect(() => {
		fetch(`${process.env.REACT_APP_BACKEND}/events`)
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
									host={event.host}
									price={event.price}
									location={event.address}
									date={event.eventDate}
									link={`/events/${event._id}`}
								/>
							);
						})
						.slice(0, 6)}

				{!events &&
					[ 1, 2, 3, 4, 5, 6 ].map((skeleton) => {
						return <SkeletonElement />;
					})}
			</div>
			<Link to="/events" className="btn btn-outline-primary my-3">
				View All Events
			</Link>
		</div>
	);
};

export default CardSection;
