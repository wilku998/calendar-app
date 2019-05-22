import axios from 'axios';

export const setWeather = (fiveDaysWeather) => ({
	type: 'SET_WEATHER',
	fiveDaysWeather
});

export const searchWeather = (lat, lng) => {
	return (dispatch) => {
		axios(
			`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lng}&units=metric
			&appid=${process.env.WEATHER_API_KEY}`
		).then((res) => {
			dispatch(setWeather(res.data));
		});
	};
};
