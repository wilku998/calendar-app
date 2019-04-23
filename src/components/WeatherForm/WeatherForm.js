import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { Input, Icon, message } from 'antd';

import { setWeather } from '../../actions/weather';
import styleForm from './styledWeatherForm';

const InputSearch = Input.Search;

class WeatherForm extends Component {
	state = {
		inputVal: ''
	};

	onInputChange = (e) => {
		const inputVal = e.target.value;
		this.setState(() => ({
			inputVal
		}));
	};

	onSubmit = (e) => {
		e.preventDefault();
	};

	search = () => {
		axios(
			`https://maps.googleapis.com/maps/api/geocode/json?address=${this.state.inputVal}&key=${process.env
				.GOOGLE_API_KEY}`
		)
			.then((res) => {
				const geoLocation = res.data.results[0].geometry.location;
				return axios(
					`https://api.openweathermap.org/data/2.5/forecast?lat=${geoLocation.lat}&lon=${geoLocation.lng}&units=metric
				&appid=${process.env.WEATHER_API_KEY}`
				);
			})
			.then((res) => {
				this.props.setWeather(res.data);
			})
			.catch((err) => {
				message.warning(`The location hasn't found`);
			});
	};

	render() {
		const { antdSize, className, mobileView } = this.props;
		return (
			<form className={className} onSubmit={this.onSubmit}>
				<InputSearch
					enterButton={
						mobileView ? (
							<span>
								<Icon type="search" />
							</span>
						) : (
							'Get weather'
						)
					}
					type="text"
					placeholder={mobileView ? 'Search weather' : 'Country, city'}
					onChange={this.onInputChange}
					onSearch={this.search}
					size={antdSize}
				/>
			</form>
		);
	}
}

const mapDispatchToProps = (dispatch) => ({
	setWeather: (obj) => dispatch(setWeather(obj))
});

export default connect(undefined, mapDispatchToProps)(styleForm(WeatherForm));
