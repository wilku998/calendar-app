import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { Input } from 'antd';

import { setWeather } from '../actions/weather';

const InputSearch = Input.Search;

class GeoForm extends Component {
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
				console.log(err);
			});
	};

	render() {
		return (
			<form onSubmit={this.onSubmit}>
				<InputSearch
					enterButton="Get weather"
					type="text"
					placeholder="country, city"
					onChange={this.onInputChange}
					onSearch={this.search}
					style={{
						width: '40rem'
					}}
				/>
			</form>
		);
	}
}

const mapDispatchToProps = (dispatch) => ({
	setWeather: (obj) => dispatch(setWeather(obj))
});
export default connect(undefined, mapDispatchToProps)(GeoForm);
