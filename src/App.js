import React from 'react';
import logo from './logo.svg';
import './App.css';

import { WiredInput } from "wired-input"
import TextField from '@material-ui/core/TextField';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

const inputStyle = {
	width: '40%',
}

const GASOLINE_PRICE = 9.87;
const PETROL_PRICE = 10.33;
const DIESEL_PRICE = 15.12; // Je dis n'importe quoi

class App extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			distance: 0,
			consumption: 3.4,
			fuelType: 'gazoline',
			fuelPrice: GASOLINE_PRICE,
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

	setFuelType = (fuelType) => {
		const { distance, consumption } = this.state;
		let fuelPrice = this.state.fuelPrice;
		switch (fuelType) {
			case 'gazoline':
				fuelPrice = GASOLINE_PRICE;
				break;
			case 'petrol':
				fuelPrice = PETROL_PRICE;
				break;
			case 'diesel':
				fuelPrice = DIESEL_PRICE;
				break;
		}
		this.setState({
			fuelType: fuelType,
			fuelPrice: fuelPrice,
			price: ((distance*consumption*fuelPrice).toFixed(8)/100).toFixed(2),
		});
	}

	setFuelPrice = (fuelPrice) => {
		const { distance, consumption } = this.state;
		this.setState({
			fuelPrice: fuelPrice,
			fuelType: 'custom',
			price: ((distance*consumption*fuelPrice).toFixed(8)/100).toFixed(2),
		});
	}

	setPrice = () => {
		const { distance, consumption, fuelPrice } = this.state;
		this.setState({price: ((distance*consumption*fuelPrice).toFixed(8)/100).toFixed(2)});
	}

	render() {
		const { price } = this.state;
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
							{/* <label>Distance (km) :</label> */}
							<TextField
								label="Distance (km)"
								onChange={(e) => {
									this.setDistance(e.target.value);
								}}
								style={inputStyle}
								value={this.state.distance}
							/>
						</div>

						<div className="form-control">
							{/* <label>Fuel consumption (L/100km) :</label> */}
							<TextField
								label="Fuel consumption (L/100km)"
								onChange={(e) => {
									this.setConsumption(e.target.value);
								}}
								style={inputStyle}
								value={this.state.consumption}
							/>
						</div>

						<FormControl component="fieldset">
							<FormLabel component="legend">Fuel type</FormLabel>
							<RadioGroup
								aria-label="Fuel type"
								name="fueltype"
								onChange={(e) => {
									this.setFuelType(e.target.value);
								}}
								value={this.state.fuelType}
							>
								<FormControlLabel value="gazoline" control={<Radio />} label="Gazoline" />
								<FormControlLabel value="petrol" control={<Radio />} label="Petrol" />
								<FormControlLabel value="diesel" control={<Radio />} label="Diesel" />
								<FormControlLabel value="custom" control={<Radio />} label="Custom" />
							</RadioGroup>
						</FormControl>

						<div className="form-control">
							<TextField
								label="Fuel price (DH/L)"
								onChange={(e) => {
									this.setFuelPrice(e.target.value);
								}}
								style={inputStyle}
								value={this.state.fuelPrice}
							/>
						</div>

						<div className="form-control">
							{/* <label>Price (DH) :</label> */}
							<TextField
								label="Price (DH)"
								readOnly
								style={inputStyle}
								value={price}
							/>
						</div>
					</section>
				</main>
			</div>
		);
	}
}

export default App;
