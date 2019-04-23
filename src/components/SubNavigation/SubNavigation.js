import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Menu, Icon } from 'antd';

import styleSubNav from './styledSubNavigation';
import { toggleModal } from '../../actions/modal';
import { removeItems } from '../../actions/items';
import theme from '../../styledComponents/theme';
const { SubMenu, Item } = Menu;

const SubNavigation = ({ items, openModal, removeItems, collapsed, className }) => (
	<nav className={className}>
		<Menu mode="inline" theme="dark" inlineCollapsed={collapsed} style={{ minHeight: '100%' }}>
			{items.map((item, iSub) => (
				<SubMenu
					key={`sub-${iSub}`}
					title={
						<span>
							<Icon type={item.icon} />
							<span>{item.key}</span>
						</span>
					}
				>
					{item[item.key].length > 0 && (
						<Item style={{ backgroundColor: theme.colorGreyDark3 }} onClick={() => removeItems(item.key)}>
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
	</nav>
);


const getIcon = (key) => {
	switch (key) {
		case 'tasks':
			return 'book';
		case 'incomes':
			return 'rise';
		case 'expenses':
			return 'fall';
	}
};

const mapDispatchToProps = (dispatch) => ({
	openModal: (selectedDay) => dispatch(toggleModal(true, selectedDay)),
	removeItems: (kind) => dispatch(removeItems(kind))
});

const mapStateToProps = ({ items, styles }) => {
	return {
		items: Object.keys(items).map((key) => ({
			key,
			[key]: items[key],
			icon: getIcon(key)
		})),
		collapsed: styles.subNavCollapsed
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(styleSubNav(SubNavigation));
