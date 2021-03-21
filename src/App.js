import React from 'react';

import './App.css';
import NavBar from './Components/NavBar/NavBar';

import Home from './Pages/Home/Home';

function App() {
	return (
		<div className="App">
			<NavBar links={[ 'Events', 'Create An Event' ]} />
			<Home />
		</div>
	);
}

export default App;
