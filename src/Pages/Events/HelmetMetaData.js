import React from 'react';
import { Helmet } from 'react-helmet';

const HelmetMetaData = (props) => {
	let title = props.title !== undefined ? props.title : 'Evently';

	return (
		<Helmet>
			<title>{title}</title>
			<meta property="title" content={title} />
			<meta property="og:title" content={title} />
		</Helmet>
	);
};

export default HelmetMetaData;
