import splitWeatherDays from '../functions/splitWeatherDays';

export default (state = [], action) => {
	const { type } = action;
	switch (type) {
		case 'SET_WEATHER':
			return splitWeatherDays(action.fiveDaysWeather);
		default:
			return state;
	}
};
