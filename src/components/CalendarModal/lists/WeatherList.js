import React from 'react';
import PropTypes from 'prop-types';

import { List, ListItem, ListContainer } from './styledList';

const Weather = ({ weather }) => {
	const half = Math.floor(weather.length / 2);
	const weatherArrs = [ weather.slice(0, half), weather.slice(half) ];

	return (
		<ListContainer>
			{weatherArrs.map((weather, i) => (
				<List marginTop={false} key={i}>
					{weather.map((e, i) => (
						<ListItem padding="small" key={i}>
							<span>{e.main.temp}℃</span> <span>{e.dt_txt.split(' ')[1]}</span>
						</ListItem>
					))}
				</List>
			))}
		</ListContainer>
	);
};

Weather.propTypes = {
	weather: PropTypes.array.isRequired
};

export default Weather;
