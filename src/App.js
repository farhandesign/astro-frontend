import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import Home from './Pages/Home/Home';
import SignupPage from './Pages/Auth/SignupPage';


function App() {
	return (
		<div className="App">
			<BrowserRouter>
				<Switch>
				<LayoutRoute path="/" exact={true} component={Home} />
				<LayoutRoute path="/signup" exact={true} component={SignupPage} />
				</Switch>
			</BrowserRouter>
		</div>
	);
}

export default App;
