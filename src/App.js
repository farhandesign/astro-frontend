import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import Home from './Pages/Home/Home';
import SignupPage from './Pages/Auth/SignupPage';
import LayoutRoute from './Pages/LayoutRoute';
import CreateEvent from './Pages/Events/CreateEvent';


function App() {
	return (
		<div className="App">
			<BrowserRouter>
				<Switch>
				<LayoutRoute path="/" exact={true} component={Home} />
				<LayoutRoute path="/signup" exact={true} component={SignupPage} />
				<LayoutRoute path="/create-event" exact={true} component={CreateEvent} />
				</Switch>
			</BrowserRouter>
		</div>
	);
}

export default App;
