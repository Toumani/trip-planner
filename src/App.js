import React from 'react';
import logo from './logo.svg';
import './App.css';

import { WiredInput } from "wired-input"

class App extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			distance: 0,
			consumption: 3.4,
			fuelPrice: 10,
			price: 0,
		}
	}

	setDistance = (distance) => {
		const { consumption, fuelPrice } = this.state;
		this.setState({
			distance: distance,
			price: ((distance*consumption*fuelPrice).toFixed(8)/100).toFixed(2),
		});
	}

	setConsumption = (consumption) => {
		const { distance, fuelPrice } = this.state;
		this.setState({
			consumption: consumption,
			price: ((distance*consumption*fuelPrice).toFixed(8)/100).toFixed(2),
		});
	}

	setFuelPrice = (fuelPrice) => {
		const { distance, consumption } = this.state;
		this.setState({
			fuelPrice: fuelPrice,
			price: ((distance*consumption*fuelPrice).toFixed(8)/100).toFixed(2),
		});
	}

	setPrice = () => {
		const { distance, consumption, fuelPrice } = this.state;
		this.setState({price: ((distance*consumption*fuelPrice).toFixed(8)/100).toFixed(2)});
	}

	render() {
		const { price } = this.state;
		// console.log('Distance: ', distance);
		// console.log('Consumption: ', consumption);
		// console.log('Fuel price: ', fuelPrice);
		console.log(this.state.price);
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
							<input
								onChange={(e) => {
									this.setDistance(e.target.value);
								}}
								value={this.state.distance}
							></input>
						</div>

						<div className="form-control">
							<label>Fuel consumption (L/100km)</label>
							<input
								onChange={(e) => {
									this.setConsumption(e.target.value);
								}}
								value={this.state.consumption}
							></input>
						</div>

						<div className="form-control">
							<label>Fuel price (DH/L)</label>
							<input
								onChange={(e) => {
									this.setFuelPrice(e.target.value);
								}}
								value={this.state.fuelPrice}
							></input>
						</div>

						<div className="form-control">
							<label>Price (DH)</label>
							<input
								readOnly
								value={price}
							></input>
						</div>
					</section>
				</main>
			</div>
		);
	}
}

export default App;
