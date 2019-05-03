import React from 'react';
import { connect } from 'react-redux';
import numeral from 'numeral';
import { Icon } from 'antd';
import PropTypes from 'prop-types';

import { ListItem, ListItemTitle, RemoveButton, TaskDescription } from '../styledList';
import { removeItem } from '../../../../actions/items';

const ItemsListItem = ({ item, type }) => {
	const isTask = type === 'tasks';
	const onRemoveButtonClick = () => {
		removeItem(item.id, type);
	};

	return (
		<ListItem padding={isTask ? 'big' : 'small'}>
			<ListItemTitle>
				<RemoveButton onClick={onRemoveButtonClick}>
					<Icon type="close" />
				</RemoveButton>
				{item.title}
			</ListItemTitle>
			{isTask ? (
				<TaskDescription>{item.description}</TaskDescription>
			) : (
				<span>{numeral(item.value).format('$0,0.00')}</span>
			)}
		</ListItem>
	);
};

ItemsListItem.propTypes = {
	item: PropTypes.object.isRequired,
	removeItem: PropTypes.func.isRequired,
	type: PropTypes.string.isRequired
};

const mapDispatchToProps = (dispatch) => ({
	removeItem: (id, type) => dispatch(removeItem(id, type))
});
export default React.memo(connect(undefined, mapDispatchToProps)(ItemsListItem));
