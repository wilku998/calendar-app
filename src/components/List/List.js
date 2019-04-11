import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import numeral from 'numeral';
import { Icon } from 'antd';

import { TitleContainer, RemoveButton, List, ItemTitle, TaskDescription, ListItem } from './StyledList.js';
import { removeItem } from '../../actions/items';

const ListContainer = ({ items, title, className, removeItem }) => {
	return (
		<div className={className}>
			{title !== 'Tasks' && <h3>{title}</h3>}
			<List>
				{items.map((item, i) => (
					<ListItem key={`${item.title}-${i}`} padding={title==='Tasks' ? 'big' : 'small'}>
						<TitleContainer>
							<RemoveButton onClick={() => removeItem(item.id, title.toLowerCase())}>
								<Icon type="close" />
							</RemoveButton>
							<ItemTitle>{item.title}</ItemTitle>
						</TitleContainer>
						{item.value ? <span>{numeral(item.value).format('$0,0.00')}</span> : <TaskDescription>{item.description}</TaskDescription>}
					</ListItem>
				))}
			</List>
		</div>
	);
};

const StyledListContainer = styled(ListContainer)`
    flex: 1;
	margin-top: 2rem;
	&:not(:last-child){
		margin-right: 2rem;
    };
    
    & > h3{
        margin-bottom: 0;
    }
`;

const mapDispatchToProps = (dispatch) => ({
	removeItem: (id, kind) => dispatch(removeItem(id, kind))
});

export default connect(undefined, mapDispatchToProps)(StyledListContainer);
