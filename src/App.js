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
import Typography from '@material-ui/core/Typography';

const inputStyle = {
	width: '100%',
}

const radioGroupStyle = {
	flexDirection: 'row',
	justifyContent: 'space-around',

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
					<h1>
						<img src={logo} className="App-logo" alt="logo" />
						Trip planner
					</h1>
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
								type="number"
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
								type="number"
								value={this.state.consumption}
							/>
						</div>

						<div className="form-control">
							<TextField
								label="Fuel price (DH/L)"
								onChange={(e) => {
									this.setFuelPrice(e.target.value);
								}}
								style={inputStyle}
								type="number"
								value={this.state.fuelPrice}
							/>
						</div>

						<FormControl component="fieldset" style={{width: '100%'}}>
							{/* <FormLabel component="legend">Fuel type</FormLabel> */}
							<RadioGroup
								aria-label="Fuel type"
								name="fueltype"
								onChange={(e) => {
									this.setFuelType(e.target.value);
								}}
								style={radioGroupStyle}
								value={this.state.fuelType}
							>
								<FormControlLabel value="gazoline" control={<Radio style={{color: '#61dafb'}}/>} label="Gazoline" />
								<FormControlLabel value="petrol" control={<Radio style={{color: '#61dafb'}}/>} label="Petrol" />
								<FormControlLabel value="diesel" control={<Radio style={{color: '#61dafb'}}/>} label="Diesel" />
								<FormControlLabel value="custom" control={<Radio style={{color: '#61dafb'}}/>} label="Custom" />
							</RadioGroup>
						</FormControl>
					</section>
					<section className="result-section">
						<Typography variant="overline" display="block" gutterBottom style={{textAlign: 'left', paddingLeft: '5%'}}>
							Estimated cost
						</Typography>
						<Typography className="result" variant="h1" component="h2" gutterBottom>
							{ price } DH
						</Typography>
					</section>
				</main>
			</div>
		);
	}
}

export default App;
