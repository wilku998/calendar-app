import React, { useState, Fragment } from 'react';
import { connect } from 'react-redux';
import { toggleModal } from '../actions/modal';
import styled from 'styled-components';

const NavigationItem = ({ className, item, isExpanded, ...rest }) => {
	const { key } = item;
	const setExpanded = () => {
		rest.setExpanded(isExpanded ? undefined : key);
	};

	const openModal = (e) => {
		console.log(e)
		rest.openModal({...e.createdAt})
	}

	return (
		<li className={className}>
			<NavigationItemButton onClick={setExpanded}>{key}</NavigationItemButton>
			{isExpanded && (
				<Fragment>
					<ExpandedList>{item[key].map((e) => <li key={e.id} onClick={() => openModal(e)}>{e.title}</li>)}</ExpandedList>
				</Fragment>
			)}
		</li>
	);
};

const styledNavigationItem = styled(NavigationItem)`
    font-size: 1.6rem;
    &:not(:last-child){
        border-bottom: 1px solid white;
    }
`;

const NavigationItemButton = styled.button`cursor: pointer;`;

const ExpandedList = styled.ul`list-style: none;`;

const mapDispatchToProps = (dispatch) => ({
	openModal: (selectedDay) => dispatch(toggleModal(true, selectedDay))
});

export default connect(undefined, mapDispatchToProps)(styledNavigationItem);
