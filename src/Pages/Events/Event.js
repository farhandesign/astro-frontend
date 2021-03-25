import React, { useState, useEffect } from 'react';
import Card from '../../Components/Card/Card';

const Event = (props) => {
	const [ event, setEvent ] = useState();
	console.log(props);
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
							<Card
								title={e.name}
								imgSrc={e.eventImg}
								description={e.description}
								location={e.address}
								date={e.eventDate.slice(0, 10).split('-').reverse().join('-')}
								time={e.eventDate}
							/>
						);
					})}
			</div>
		</div>
	);
};

export default Event;
