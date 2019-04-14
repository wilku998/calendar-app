import React from 'react';
import { connect } from 'react-redux';
import numeral from 'numeral';
import { Icon } from 'antd';
import PropTypes from 'prop-types';

import {
	TitleContainer,
	RemoveButton,
	List,
	ItemTitle,
	TaskDescription,
	ListItem,
	styleListContainer
} from './styledModalList';
import { removeItem } from '../../../actions/items';

const ListContainer = ({ items, title, className, removeItem }) => {
	return (
		<div className={className}>
			{title !== 'Tasks' && <h3>{title}</h3>}
			<List>
				{items.map((item, i) => (
					<ListItem key={`${item.title}-${i}`} padding={title === 'Tasks' ? 'big' : 'small'}>
						<TitleContainer>
							<RemoveButton onClick={() => removeItem(item.id, title.toLowerCase())}>
								<Icon type="close" />
							</RemoveButton>
							<ItemTitle>{item.title}</ItemTitle>
						</TitleContainer>
						{item.value ? (
							<span>{numeral(item.value).format('$0,0.00')}</span>
						) : (
							<TaskDescription>{item.description}</TaskDescription>
						)}
					</ListItem>
				))}
			</List>
		</div>
	);
};

const mapDispatchToProps = (dispatch) => ({
	removeItem: (id, kind) => dispatch(removeItem(id, kind))
});

ListContainer.propTypes = {
	className: PropTypes.string.isRequired,
	items: PropTypes.array.isRequired,
	title: PropTypes.string.isRequired,
	removeItem: PropTypes.func.isRequired
};

export default connect(undefined, mapDispatchToProps)(styleListContainer(ListContainer));
