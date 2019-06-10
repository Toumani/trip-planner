import React from 'react';
import logo from './logo.svg';
import './App.css';

import { WiredInput } from "wired-input"

function App() {
	return (
		<div className="App">
			<header className="App-header">
				<img src={logo} className="App-logo" alt="logo" />
				<p>
					Edit <code>src/App.js</code> and save to reload.
				</p>
				<a
					className="App-link"
					href="https://reactjs.org"
					target="_blank"
					rel="noopener noreferrer"
				>
					Learn React
				</a>
			</header>
			<main className="App-main">
				<section className="form-section">
					<div className="form-control">
						<label>Distance (km)</label>
						<wired-input></wired-input>
					</div>
					<div className="form-control">
						<label>Fuel consumption (L/100km)</label>
						<wired-input></wired-input>
					</div>
					<div className="form-control">
						<label>Fuel price (DH/L)</label>
						<wired-input></wired-input>
					</div>
					<div className="form-control">
						<label>Price (DH)</label>
						<wired-input></wired-input>
					</div>
				</section>
			</main>
		</div>
	);
}

export default App;
