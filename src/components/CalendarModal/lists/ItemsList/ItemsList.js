import React from 'react';
import PropTypes from 'prop-types';

import ItemsListItem from './ItemsListItem';
import { List } from '../styledList';

const ItemsList = ({ items, title }) => {
	console.log(' items render');
	return (
		<List marginTop={true}>
			{title !== 'Tasks' && <h3>{title}</h3>}
			{items.map((item, i) => (
				<ItemsListItem key={`${item.title}-${i}`} item={item} type={title.toLowerCase()} />
			))}
		</List>
	);
};

ItemsList.propTypes = {
	items: PropTypes.array.isRequired,
	title: PropTypes.string.isRequired
};

export default ItemsList;
