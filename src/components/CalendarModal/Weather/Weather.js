import React from 'react';
import PropTypes from 'prop-types';

import { List, ListItem } from '../ModalList/styledModalList';

const Weather = ({ weather }) => {
	return (
		<List withMargin={true}>
			{weather.map((e, i) => (
				<ListItem padding="small" key={i}>
					<span>{e.main.temp}℃</span> <span>{e.dt_txt.split(' ')[1]}</span>
				</ListItem>
			))}
		</List>
	);
};

Weather.propTypes = {
	weather: PropTypes.array.isRequired
};

export default Weather;
