import React, { Component, Fragment } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { Menu, Icon } from 'antd';

import { toggleModal } from '../actions/modal';
import { removeItems } from '../actions/items';
import theme from '../styledComponentsTheme/styledComponentsTheme';
const { SubMenu, Item } = Menu;

const SubNavigation = ({ items, openModal, removeItems, collapsed }) => (
	<Fragment>
		<MenuContainer>
			<Menu
				mode="inline"
				theme="dark"
				inlineCollapsed={collapsed}
				style={{ minHeight: '100%' }}
			>
				{items.map((item, iSub) => (
					<SubMenu
						key={`sub-${iSub}`}
						title={
							<span>
								<Icon type="appstore" />
								<span>{item.key}</span>
							</span>
						}
					>
						{item[item.key].length > 0 && (
							<Item
								style={{ backgroundColor: theme.colorGreyDark3 }}
								onClick={() => removeItems(item.key)}
							>
								Remove all
							</Item>
						)}
						{item[item.key].map((e, i) => (
							<Item key={`sub-${iSub}-item-${i}`} onClick={() => openModal(e.createdAt)}>
								{e.title}
							</Item>
						))}
					</SubMenu>
				))}
			</Menu>
		</MenuContainer>
	</Fragment>
);


const MenuContainer = styled.nav`
	height: 100%;
	position: fixed;
	top: 5rem;
	left: 0;
	width: 25rem;
	overflow-y: auto;
	::-webkit-scrollbar {
		display: none;
	}
`;

const mapDispatchToProps = (dispatch) => ({
	openModal: (selectedDay) => dispatch(toggleModal(true, selectedDay)),
	removeItems: (kind) => dispatch(removeItems(kind))
});

const mapStateToProps = ({ items, subNavigation }) => {
	return {
		items: Object.keys(items).map((key) => ({
			key,
			[key]: items[key]
		})),
		collapsed: subNavigation.collapsed
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(SubNavigation);

