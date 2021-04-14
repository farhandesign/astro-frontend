import React from 'react';
import { BrowserRouter, Switch } from 'react-router-dom';
import './App.css';
import Home from './Pages/Home/Home';
import SignupPage from './Pages/Auth/SignupPage';
import LayoutRoute from './Pages/LayoutRoute';
import Event from './Pages/Events/Event';
import AllEvents from './Pages/Events/AllEvents';
import CreateNewEvent from './Pages/Events/CreateNewEvent';
import UpdateEvent from './Pages/Events/UpdateEvent';
import LoginPage from './Pages/Auth/LoginPage';
import ForgotPassword from './Pages/Auth/ForgotPassword';
import ResetPassword from './Pages/Auth/ResetPassword';

import PrivateRoute from './Pages/PrivateRoute';
import PrivatePage from './Pages/PrivatePage';

function App() {
	return (
		<div className="App">
			<BrowserRouter>
				<Switch>
					<PrivateRoute exact path="/private" component={PrivatePage} />
					<LayoutRoute path="/" exact={true} component={Home} />
					<LayoutRoute path="/signup" exact={true} component={SignupPage} />
					<LayoutRoute path="/events/:id" exact={true} component={Event} />
					<LayoutRoute path="/create-event" exact={true} component={CreateNewEvent} />
					<LayoutRoute path="/events/update/:id" exact={true} component={UpdateEvent} />
					<LayoutRoute path="/events" exact={true} component={AllEvents} />
					<LayoutRoute path="/login" exact={true} component={LoginPage} />
					<LayoutRoute path="/forgotpassword" exact={true} component={ForgotPassword} />
					<LayoutRoute path="/passwordreset/:resetToken" exact={true} component={ResetPassword} />
				</Switch>
			</BrowserRouter>
		</div>
	);
}

export default App;
