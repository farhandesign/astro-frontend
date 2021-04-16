import React from 'react';
import { BrowserRouter, Switch } from 'react-router-dom';
import './App.css';
import AuthState from './context/AuthState';
import Home from './Pages/Home/Home';
import SignupPage from './Pages/Auth/SignupPage';
import LayoutRoute from './Pages/LayoutRoute';
import Event from './Pages/Events/Event';
import AllEvents from './Pages/Events/AllEvents';
import CreateNewEvent from './Pages/Events/CreateNewEvent';
import UpdateEvent from './Pages/Events/UpdateEvent';
import LoginPage from './Pages/Auth/LoginPage';
import LogoutPage from './Pages/Auth/LogoutPage';
import ForgotPassword from './Pages/Auth/ForgotPassword';
import ResetPassword from './Pages/Auth/ResetPassword';
import BuyTickets from './Pages/Events/BuyTickets';

import PrivatePage from './Pages/PrivatePage';

function App() {
	return (
		<div className="App">
			<BrowserRouter>
				<AuthState>
					<Switch>
						<LayoutRoute exact={true} path="/private" component={PrivatePage} />
						<LayoutRoute path="/" exact={true} component={Home} />
						<LayoutRoute path="/signup" exact={true} component={SignupPage} />
						<LayoutRoute path="/events/:id" exact={true} component={Event} />
						<LayoutRoute path="/create-event" exact={true} component={CreateNewEvent} />
						<LayoutRoute path="/events/update/:id" exact={true} component={UpdateEvent} />
						<LayoutRoute path="/events" exact={true} component={AllEvents} />
						<LayoutRoute path="/login" exact={true} component={LoginPage} />
						<LayoutRoute path="/logout" exact={true} component={LogoutPage} />
						<LayoutRoute path="/forgotpassword" exact={true} component={ForgotPassword} />
						<LayoutRoute path="/passwordreset/:resetToken" exact={true} component={ResetPassword} />
						<LayoutRoute path="/buy/:id" exact={true} component={BuyTickets} />
					</Switch>
				</AuthState>
			</BrowserRouter>
		</div>
	);
}

export default App;
