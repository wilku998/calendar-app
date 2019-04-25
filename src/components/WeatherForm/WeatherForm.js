import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { Input, Icon, message } from 'antd';

import { searchWeather } from '../../actions/weather';
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

	search = async () => {
		try {
			const res = await axios(
				`https://maps.googleapis.com/maps/api/geocode/json?address=${this.state.inputVal}&key=${process.env
					.GOOGLE_API_KEY}`
			)
			const {lat, lng} = res.data.results[0].geometry.location;
			await this.props.searchWeather(lat, lng)
		}catch(error){
			message.warning(`The location hasn't found`);
		}
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
	searchWeather: (lat, lng) => dispatch(searchWeather(lat, lng))
});

export default connect(undefined, mapDispatchToProps)(styleForm(WeatherForm));
