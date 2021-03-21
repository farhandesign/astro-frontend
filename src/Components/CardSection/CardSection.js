import React from 'react';
import Card from '../Card/Card';

const cardContent = [
	{
		title: 'Visit Dubai',
		description: 'Some quick example text to build on the card title and make up the bulk of the cards content.',
		imgSrc:
			'https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
	},
	{
		title: 'Explore Abu Dhabi',
		description: 'Some quick example text to build on the card title and make up the bulk of the cards content.',
		imgSrc:
			'https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
	},
	{
		title: 'Ras Al Khaimah Tour',
		description: 'Some quick example text to build on the card title and make up the bulk of the cards content.',
		imgSrc:
			'https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
	},
	{
		title: 'Ras Al Khaimah Tour',
		description: 'Some quick example text to build on the card title and make up the bulk of the cards content.',
		imgSrc:
			'https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
	},
	{
		title: 'Ras Al Khaimah Tour',
		description: 'Some quick example text to build on the card title and make up the bulk of the cards content.',
		imgSrc:
			'https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
	},
	{
		title: 'Ras Al Khaimah Tour',
		description: 'Some quick example text to build on the card title and make up the bulk of the cards content.',
		imgSrc:
			'https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
	}
];

const CardSection = () => {
	return (
		<div className="container py-5">
			<div className="row">
				<div className="col-12">
					<h1>Upcoming Events</h1>
				</div>
				{cardContent.map((card) => {
					return <Card title={card.title} imgSrc={card.imgSrc} description={card.description} />;
				})}
			</div>
		</div>
	);
};

export default CardSection;
