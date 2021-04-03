import React, { useState, useEffect } from 'react';
import Card from '../../Components/Card/Card';
import SkeletonElement from '../../Components/Skeletons/SkeletonElement';

const AllEvents = () => {
	const [ arr, setArr ] = useState([]);
	const [ slice, setSlice ] = useState(6);
	const [ events, setEvents ] = useState(null);
	useEffect(() => {
		fetch(`${process.env.REACT_APP_BACKEND}/events/all`)
			.then((res) => {
				return res.json();
			})
			.then((data) => {
				setEvents(data);
				setArr(data);
			});
	}, []);

	const handleShow = () => {
		setSlice(slice + 3);
	};

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
						.slice(0, slice)}

				{!events &&
					[ 1, 2, 3, 4, 5, 6 ].map((skeleton) => {
						return <SkeletonElement />;
					})}
			</div>
			{slice <= arr.length && (
				<button className="btn btn-outline-primary my-3" onClick={handleShow}>
					Show More
				</button>
			)}
		</div>
	);
};

export default AllEvents;
