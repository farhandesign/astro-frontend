import React from 'react';
import { Route } from 'react-router-dom';
import NavBar from '../Components/NavBar/NavBar';

const LayoutRoute = (props) => {
	return (
		<div>
			<NavBar links={[ 'Events', 'Create An Event' ]} />
			<div className="content" style={{ minHeight: 'calc(100vh - 112px)' }}>
				<Route path={props.path} exact={props.exact} component={props.component} />
			</div>
		</div>
	);
};
export default LayoutRoute;
