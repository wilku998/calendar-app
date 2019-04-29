import React from 'react';
import PropTypes from 'prop-types';

import { List, ListItem } from './styledModalList';
import { CalendarModalListContainer } from '../styledCalendarModal';

const Weather = ({ weather }) => {
	console.log('weather render');
	const half = Math.floor(weather.length / 2);
	const weatherArrs = [ weather.slice(0, half), weather.slice(half) ];

	return (
		<CalendarModalListContainer>
			{weatherArrs.map((weather, i) => (
				<List key={i}>
					{weather.map((e, i) => (
						<ListItem padding="small" key={i}>
							<span>{e.main.temp}℃</span> <span>{e.dt_txt.split(' ')[1]}</span>
						</ListItem>
					))}
				</List>
			))}
		</CalendarModalListContainer>
	);
};

Weather.propTypes = {
	weather: PropTypes.array.isRequired
};

export default Weather;
