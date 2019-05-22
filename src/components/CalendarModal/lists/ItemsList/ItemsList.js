import React from 'react';
import PropTypes from 'prop-types';

import ItemsListItem from './ItemsListItem';
import { List } from '../styledList';

const ItemsList = ({ items, title }) => {
	return (
		<List isWeather={false}>
			{title !== 'Tasks' && <h3>{title}</h3>}
			{items.map((item, i) => (
				<ItemsListItem key={item.id} item={item} type={title.toLowerCase()} />
			))}
		</List>
	);
};

ItemsList.propTypes = {
	items: PropTypes.arrayOf(PropTypes.object).isRequired,
	title: PropTypes.string.isRequired
};

export default ItemsList;
