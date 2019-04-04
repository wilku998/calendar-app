import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import NavigationItem from './NavigationItem';
import { toggleModal } from '../actions/modal';
const NavContainer = styled.nav`
	background-color: green;
	height: 100%;
	position: fixed;
	top: 0;
	right: 0;
	padding: 1rem;
	width: 20rem;
`;
const NavList = styled.ul`
	list-style: none;
	display: flex;
	flex-direction: column;
`;

class Navigation extends Component {
	state = {
		expandedItem: undefined
	};

	setExpanded = (expandedItem) => {
		this.setState(() => ({
			expandedItem
		}));
	};

	render() {
		const { items } = this.props;
		const { expandedItem } = this.state;
		return (
			<NavContainer>
				navigation
				<NavList>
					{items.map((item) => (
						<NavigationItem
							isExpanded={expandedItem === item.key}
							setExpanded={this.setExpanded}
							item={item}
							key={item.key}
						/>
					))}
				</NavList>
			</NavContainer>
		);
	}
}



const mapStateToProps = ({ tasks, budget }) => ({
	items: [
		{ tasks, key: 'tasks' },
		{ incomes: budget.incomes, key: 'incomes' },
		{ expenses: budget.expenses, key: 'expenses' }
	]
});
export default connect(mapStateToProps)(Navigation);
