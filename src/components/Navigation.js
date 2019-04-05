import React, { Component, Fragment } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { toggleModal } from '../actions/modal';
import { Menu, Icon, Button } from 'antd';
const { SubMenu } = Menu;

class Navigation extends Component {
	state = {
		collapsed: false,
	}

	toggleCollapsed = () => {
		this.setState({
		  collapsed: !this.state.collapsed,
		});
	  }

	render(){
		const { items, openModal } = this.props;
		return (
			<Fragment>
				<Button type="primary" onClick={this.toggleCollapsed} style={{ marginBottom: 16 }}>
					<Icon type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'} />
				</Button>
				<MenuContainer>
				<Menu
					mode="inline"
					theme="dark"
					inlineCollapsed={this.state.collapsed}
					style={{direction: 'ltr', minHeight: '100%'}}
				>
					{items.map((item, iSub) => (
						<SubMenu key={`sub-${iSub}`} title={<span><Icon type="appstore" /><span>{item.key}</span></span>}>
							{item[item.key].map((e, i) => (
								<Menu.Item key={`sub-${iSub}-item-${i}`} onClick={() => openModal(e.createdAt)}>{e.title}</Menu.Item>
							))}
						</SubMenu>
					))}
				</Menu>
				</MenuContainer>
			</Fragment>
		)
	}
}


const mapDispatchToProps = (dispatch) => ({
	openModal: (selectedDay) => dispatch(toggleModal(true, selectedDay))
});

const mapStateToProps = ({ tasks, budget }) => ({
	items: [
		{ tasks, key: 'tasks' },
		{ incomes: budget.incomes, key: 'incomes' },
		{ expenses: budget.expenses, key: 'expenses' }
	]
});

export default connect(mapStateToProps, mapDispatchToProps)(Navigation);


const MenuContainer = styled.nav`
	height: 100%;
	position: fixed;
	top: 0;
	left: 0;
	width: 25rem;
	overflow-y: auto;
	direction: rtl;
`;
