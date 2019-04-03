import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { setWeather } from '../actions/weather'
const googleKey = 'AIzaSyAmHxTZ3RTeWx6AI1wokrAp5GYs9gX0QgQ';
const weathermapkey = '820e189cf767b78f910c851dc1ef01a4';

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

		axios(`https://maps.googleapis.com/maps/api/geocode/json?address=${this.state.inputVal}&key=${googleKey}`)
			.then((res) => {
				const geoLocation = res.data.results[0].geometry.location;
				console.log(geoLocation);
				return axios(
					`https://api.openweathermap.org/data/2.5/forecast?lat=${geoLocation.lat}&lon=${geoLocation.lng}&units=metric
					&appid=${weathermapkey}`
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
			<div>
				<form onSubmit={this.onSubmit}>
					<input type="text" placeholder="country, city" onChange={this.onInputChange} />
					<button>get geolocation</button>
				</form>
			</div>
		);
	}
}

const mapDispatchToProps = (dispatch) => ({
	setWeather: (obj) => dispatch(setWeather(obj))
});
export default connect(undefined, mapDispatchToProps)(GeoForm);
