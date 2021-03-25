import React from 'react';
import { BrowserRouter, Switch } from 'react-router-dom';
import './App.css';
import Home from './Pages/Home/Home';
import SignupPage from './Pages/Auth/SignupPage';
import LayoutRoute from './Pages/LayoutRoute';
import Event from './Pages/Events/Event';
import AllEvents from './Pages/Events/AllEvents';
import CreateEvent from './Pages/Events/CreateEvent';
import UpdateEvent from './Pages/Events/UpdateEvent';

function App() {
	return (
		<div className="App">
			<BrowserRouter>
				<Switch>
					<LayoutRoute path="/" exact={true} component={Home} />
					<LayoutRoute path="/signup" exact={true} component={SignupPage} />
					<LayoutRoute path="/create-event" exact={true} component={CreateEvent} />
					<LayoutRoute path="/events/:id" exact={true} component={Event} />
					<LayoutRoute path="/events/update/:id" exact={true} component={UpdateEvent} />
					<LayoutRoute path="/events" exact={true} component={AllEvents} />
				</Switch>
			</BrowserRouter>
		</div>
	);
}

export default App;
