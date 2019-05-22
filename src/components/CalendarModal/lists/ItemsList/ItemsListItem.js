import React from 'react';
import { connect } from 'react-redux';
import { Icon } from 'antd';
import PropTypes from 'prop-types';

import formatBudget from '../../../../functions/formatBudget';
import { ListItem, ListItemTitle, RemoveButton, TaskDescription } from '../styledList';
import { removeItem } from '../../../../store/actions/items';

const ItemsListItem = ({ item, type, removeItem }) => {
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
			{isTask ? <TaskDescription>{item.description}</TaskDescription> : <span>{formatBudget(item.value)}</span>}
		</ListItem>
	);
};

ItemsListItem.propTypes = {
	item: PropTypes.exact({
		createdAt: PropTypes.object.isRequired,
		id: PropTypes.string.isRequired,
		title: PropTypes.string.isRequired,
		description: PropTypes.string,
		value: PropTypes.number
	}).isRequired,
	removeItem: PropTypes.func.isRequired,
	type: PropTypes.string.isRequired
};

const mapDispatchToProps = (dispatch) => ({
	removeItem: (id, type) => dispatch(removeItem(id, type))
});
export default React.memo(connect(undefined, mapDispatchToProps)(ItemsListItem));
