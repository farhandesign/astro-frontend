import React from 'react';
import { Helmet } from 'react-helmet';

const HelmetMetaData = (props) => {
	return (
		<Helmet>
			<title>{props.title}</title>
			<meta name="description" content="Helmet application" />
			<meta property="image" content={props.im} />
		</Helmet>
	);
};

export default HelmetMetaData;
