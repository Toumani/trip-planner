import React from 'react';
import './App.css';

import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

import TextField from '@material-ui/core/TextField';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import Typography from '@material-ui/core/Typography';
import Icon from '@material-ui/core/Icon';
import Grid from '@material-ui/core/Grid';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';

import i18next from 'i18next';

import axios from 'axios';

import Sidebar from './Sidebar';
import LogoSvg from './LogoSvg';

import brands from './constants/brands';

const styles = theme => ({
})

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
			// form info
			distance: '0',

			brand: null,
			models: [],
			model: null,
			years: [],
			year: null,

			consumption: '3.4',
			fuelType: 'gazoline',
			fuelPrice: GASOLINE_PRICE,
			price: 0,
			lang: 'en',
			sidebarOpen: false,
			theme: {
                name: 'CRA',
                primaryColor: '#61dafb',
                secondaryColor: '#282c34'
            },
		}
	}

	setDistance = (distance) => {
		const { consumption, fuelPrice } = this.state;
		this.setState({
			distance: distance,
			price: ((distance*consumption*fuelPrice).toFixed(8)/100).toFixed(2),
		});
	}

	handleChange = (e) => {
		if (e.target.name === 'brand') {
			// Request for available models
			const apiKey = 'zaGD2zbw8RVZov4X6gLFEfTAdTUAieOU';
			axios
					.get(`https://apis.solarialabs.com/shine/v1/vehicle-stats/fuel-usage?make=${e.target.value}&car-truck=car&apikey=${apiKey}`)
					.then((response) => {
						console.log('response:', response);
						let models = [];
						let modelsSet = new Set();
						response.data.forEach(brand => {
							modelsSet.add(brand.Model);
						});
						response.data.forEach(brand => {
							if (modelsSet.has(brand.Model)) {
								modelsSet.delete(brand.Model);
								models.push({
									name: brand.Model,
									years: [brand.Model_Year],
								});
							}
							else {
								models.forEach(model => {
									if (model.name === brand.Model) {
										model.years.push(brand.Model_Year);
									}
								})
							}
						});
						console.log('models:', models);
						this.setState({models});
					})
					.catch((error) => {
						console.log('error:', error);
					})
		}
		else if (e.target.name === 'model') {
			this.setState({
				model: e.target.value,
				years: e.target.value.years,
			})
			return;
		}
		else if (e.target.name === 'year') {
			this.setState({
				year: e.target.value,
			})
		}
		this.setState({
			[e.target.name]: e.target.value
		})
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
			default:
				fuelPrice = GASOLINE_PRICE;
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

	openSidebar = () => {
		this.setState({sidebarOpen: true});
	}

	closeSidebar = () => {
		this.setState({sidebarOpen: false});
	}

	changeLanguage = (lang) => {
		this.setState({lang});
		i18next.changeLanguage(lang);
		this.forceUpdate();
	}

	setTheme = (theme) => {
		this.setState({theme});
	}

	render() {
		const {
			brand,
			models,
			model,
			years,
			year,

			price
		} = this.state;
		return (
			<div className="App">
				<Sidebar
					setLanguage={this.changeLanguage}
					setTheme={this.setTheme}
					closeSidebar={this.closeSidebar}
					open={this.state.sidebarOpen}
					config={{
						lang: this.state.lang,
						theme: this.state.theme,
					}}
				/>
				<header className="App-header notranslate" style={{backgroundColor: this.state.theme.secondaryColor}}>
					<div>
						<LogoSvg color={this.state.theme.primaryColor} />
						<h1 style={{color: this.state.theme.primaryColor}}>
							Trip planner
						</h1>
					</div>
					
				</header>
				<main className="App-main">
					<div id="settings-button-container" onClick={this.openSidebar}>
						<Icon>build</Icon>
					</div>
					<section className="form-section">
						<div className="form-control">
							<TextField
								label={i18next.t('distance.label') + ' (km)'}
								onChange={(e) => {
									this.setDistance(e.target.value);
								}}
								style={inputStyle}
								type="number"
								value={this.state.distance === '0' ? '' : this.state.distance}
							/>
						</div>

						<div className="form-control">
							<Grid
								container
								justify="space-around"
								direction="row"
								alignItems="flex-start"
								spacing={2}
							>
								<Grid item xs={12} md={4}>
									<FormControl style={inputStyle}>
										<InputLabel htmlFor="brand">{i18next.t('brand')}</InputLabel>
										<Select
											inputProps={{
												name: 'brand',
												id: 'brand',
											}}
											value={brand}
											onChange={this.handleChange}
										>
											{
												brands.map((brand) => (
													<MenuItem key={brand} value={brand}>{brand}</MenuItem>
												))
											}
										
										</Select>
									</FormControl>
								</Grid>
								<Grid item xs={12} md={4}>
									<FormControl style={inputStyle}>
										<InputLabel htmlFor="model">{i18next.t('model')}</InputLabel>
										<Select
											inputProps={{
												name: 'model',
												id: 'model',
											}}
											value={model}
											onChange={this.handleChange}
										>
											{
												models.map(model => (
													<MenuItem key={model.name} value={model}>{model.name}</MenuItem>
												))
											}
										</Select>
									</FormControl>
								</Grid>
								<Grid item xs={12} md={4}>
									<FormControl style={inputStyle}>
										<InputLabel htmlFor="year">{i18next.t('year')}</InputLabel>
										<Select
											inputProps={{
												name: 'year',
												id: 'year',
											}}
											value={year}
											onChange={this.handleChange}
										>
											{
												years.map(year => (
													<MenuItem key={year} value={year}>{year}</MenuItem>
												))
											}
										</Select>
									</FormControl>
								</Grid>
							</Grid>
							{/* <TextField
								label={i18next.t('fuelConsumption.label') + ' (L/km)'}
								onChange={(e) => {
									this.setConsumption(e.target.value);
								}}
								style={inputStyle}
								type="number"
								value={this.state.consumption}
							/> */}
						</div>

						<div className="form-control">
							<TextField
								label={i18next.t('fuelPrice.label') + ' (DH/L)'}
								onChange={(e) => {
									this.setFuelPrice(e.target.value);
								}}
								style={inputStyle}
								type="number"
								value={this.state.fuelPrice}
							/>
						</div>

						<FormControl component="fieldset" style={{width: '100%'}}>
							<RadioGroup
								aria-label="Fuel type"
								name="fueltype"
								onChange={(e) => {
									this.setFuelType(e.target.value);
								}}
								style={radioGroupStyle}
								value={this.state.fuelType}
							>
								<FormControlLabel value="gazoline" control={<Radio style={{color: this.state.theme.primaryColor}}/>} label={i18next.t('gazoline.label')} />
								<FormControlLabel value="petrol" control={<Radio style={{color: this.state.theme.primaryColor}}/>} label={i18next.t('petrol.label')} />
								<FormControlLabel value="diesel" control={<Radio style={{color: this.state.theme.primaryColor}}/>} label={i18next.t('diesel.label')} />
								<FormControlLabel value="custom" control={<Radio style={{color: this.state.theme.primaryColor}}/>} label={i18next.t('custom.label')} />
							</RadioGroup>
						</FormControl>
					</section>
					<section className="result-section">
						<Typography variant="overline" display="block" gutterBottom style={{textAlign: 'left', paddingLeft: '5%'}}>
							{i18next.t('cost.label')}
						</Typography>
						<Typography className="result notranslate" variant="h1" component="h2" gutterBottom style={{color: this.state.theme.primaryColor}}>
							{ price } DH
						</Typography>
					</section>
				</main>
			</div>
		);
	}
}

App.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(App);
