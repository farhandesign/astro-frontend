import React, { useState, useEffect } from 'react';
import Card from '../../Components/Card/Card';

const AllEvents = () => {
	const [ arr, setArr ] = useState([]);
	const [ slice, setSlice ] = useState(6);
	const [ events, setEvents ] = useState(null);
	useEffect(() => {
		fetch('http://localhost:3500/events')
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
									location={event.address}
									date={event.eventDate.slice(0, 15)}
									time={event.eventDate.slice(15, 33)}
								/>
							);
						})
						.reverse()
						.slice(0, slice)}
			</div>
			{slice <= arr.length && <button onClick={handleShow}>Show More</button>}
		</div>
	);
};

export default AllEvents;
