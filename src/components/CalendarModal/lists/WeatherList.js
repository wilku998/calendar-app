import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { List, ListItem, ListContainer } from './styledList';

const Weather = ({ weather }) => {
	const half = Math.floor(weather.length / 2);
	const weatherArrs = [ weather.slice(0, half), weather.slice(half) ];

	return (
		<ListContainer>
			{weatherArrs.map((weather, i) => (
				<List isWeather={true} key={i}>
					{weather.map((e, i) => (
						<ListItem padding="small" key={i}>
							<WeatherItem>
								<img src={`http://openweathermap.org/img/w/${e.weather[0].icon}.png`} />
								{e.main.temp}℃
							</WeatherItem>
							<span>{e.dt_txt.split(' ')[1]}</span>
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

const WeatherItem = styled.span`
	display: flex;
	align-items: center;

	& > img {
		height: 2.5rem;
		margin-right: .75rem;
	}
`;
export default Weather;
