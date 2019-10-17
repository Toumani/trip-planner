import React from 'react';
import logo from './logo.svg';
import './App.css';

import TextField from '@material-ui/core/TextField';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import Typography from '@material-ui/core/Typography';
import Icon from '@material-ui/core/Icon';

import i18next from 'i18next';

import Sidebar from './Sidebar';

const i18n = i18next.init({
    interpolation: {
      // React already does escaping
      escapeValue: false,
    },
    lng: 'en',
    resources: {
      en: {
        translation: {
          distance: { label: 'Distance', },
          fuelConsumption: { label: 'Fuel consumption', },
		  fuelPrice: { label: 'Fuel Price', },
		  cost: { label: 'Cost estimation'},
		  gazoline: { label: 'Gazoline',},
		  petrol: {label: 'Petrol'},
		  custom: {label: 'Custom'},
		  settings: {label: 'Settings'},
		  language: {label: 'Language'},
        },
      },
      fr: {
        translation: {
			distance: { label: 'Distance', },
			fuelConsumption: { label: 'Consommation', },
			fuelPrice: { label: 'Prix du carburant', },
			cost: { label: 'Coût estimé'},
			gazoline: { label: 'Diesel',},
			petrol: {label: 'Essence'},
			custom: {label: 'Custom'},
			settings: {label: 'Paramètres'},
			language: {label: 'Langue'},
		},
      },
    },
  },
  (err, t) => {
    if (err) {
      return console.error(err)
    }
    console.log('i18n successfully initialized')
  }
)

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
			distance: '0',
			consumption: '3.4',
			fuelType: 'gazoline',
			fuelPrice: GASOLINE_PRICE,
			price: 0,
			lang: 'en',
			sidebarOpen: false,
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

	openSidebar = () => {
		this.setState({sidebarOpen: true});
	}

	closeSidebar = () => {
		this.setState({sidebarOpen: false});
	}

	changeLanguage = (lang) => {
		this.setState({lang})
		i18next.changeLanguage(lang);
		this.forceUpdate();
	}

	render() {
		const { price } = this.state;
		
		return (
			<div className="App">
				<Sidebar
					setLanguage={this.changeLanguage}
					closeSidebar={this.closeSidebar}
					open={this.state.sidebarOpen}
					config={{
						lang: this.state.lang
					}}
				/>
				<header className="App-header notranslate">
					<h1>
						<img src={logo} className="App-logo" alt="logo" />
						Trip planner
					</h1>
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
							<TextField
								label={i18next.t('fuelConsumption.label') + ' (L/km)'}
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
								<FormControlLabel value="gazoline" control={<Radio style={{color: '#61dafb'}}/>} label={i18next.t('gazoline.label')} />
								<FormControlLabel value="petrol" control={<Radio style={{color: '#61dafb'}}/>} label={i18next.t('petrol.label')} />
								<FormControlLabel value="diesel" control={<Radio style={{color: '#61dafb'}}/>} label={i18next.t('diesel.label')} />
								<FormControlLabel value="custom" control={<Radio style={{color: '#61dafb'}}/>} label={i18next.t('custom.label')} />
							</RadioGroup>
						</FormControl>
					</section>
					<section className="result-section">
						<Typography variant="overline" display="block" gutterBottom style={{textAlign: 'left', paddingLeft: '5%'}}>
							{i18next.t('cost.label')}
						</Typography>
						<Typography className="result notranslate" variant="h1" component="h2" gutterBottom>
							{ price } DH
						</Typography>
					</section>
				</main>
			</div>
		);
	}
}

export default App;
