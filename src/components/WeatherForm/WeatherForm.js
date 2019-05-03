import React, { useState } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { Input, Icon, message } from 'antd';
import PropTypes from 'prop-types';

import { searchWeather } from '../../actions/weather';
import styleForm from './styledWeatherForm';

const InputSearch = Input.Search;

const WeatherForm = ({ antdSize, className, mobileView, searchWeather }) => {
	const [ inputValue, setInputValue ] = useState('');

	const onInputChange = (e) => {
		setInputValue(e.target.value);
	};

	const search = async () => {
		try {
			const res = await axios(
				`https://maps.googleapis.com/maps/api/geocode/json?address=${inputValue}&key=${process.env
					.GOOGLE_API_KEY}`
			);
			const { lat, lng } = res.data.results[0].geometry.location;
			await searchWeather(lat, lng);
		} catch (error) {
			message.warning(`The location hasn't found`);
		}
	};
	
	const onSubmit = (e) => {
		e.preventDefault();
		search();
	};

	return (
		<form className={className} onSubmit={onSubmit}>
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
				value={inputValue}
				type="text"
				placeholder={mobileView ? 'Search weather' : 'Country, city'}
				onChange={onInputChange}
				onSearch={search}
				size={antdSize}
			/>
		</form>
	);
};

WeatherForm.propTypes = {
	antdSize: PropTypes.string.isRequired,
	className: PropTypes.string.isRequired,
	mobileView: PropTypes.bool.isRequired,
	searchWeather: PropTypes.func.isRequired
};

const mapDispatchToProps = (dispatch) => ({
	searchWeather: (lat, lng) => dispatch(searchWeather(lat, lng))
});

export default connect(undefined, mapDispatchToProps)(styleForm(WeatherForm));
