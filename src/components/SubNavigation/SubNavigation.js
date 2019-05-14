import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Menu, Icon } from 'antd';
import PropTypes from 'prop-types';

import RemoveAllModal from '../simpleModals/RemoveAllModal';
import styleSubNav from './styledSubNavigation';
import { toggleCalendarModal } from '../../actions/calendarModal';
import theme from '../../styledComponents/theme';
const { SubMenu, Item } = Menu;

const SubNavigation = ({ items, openCalendarModal, collapsed, className, mobileView }) => {
	const [ removeAllModalProps, toggleRemoveAllModal ] = useState({ modalIsOpen: false, type: undefined });

	const openRemoveAllModal = (type) => {
		toggleRemoveAllModal({ modalIsOpen: true, type });
	};

	return (
		<nav className={className}>
			<RemoveAllModal removeAllModalProps={removeAllModalProps} toggleRemoveAllModal={toggleRemoveAllModal} />

			<Menu mode="inline" theme="dark" inlineCollapsed={collapsed} style={{ minHeight: '100%' }}>
				{items.map((item, iSub) => (
					<SubMenu
						key={`sub-${iSub}`}
						title={
							mobileView ? collapsed ? (
								<Icon type={item.icon} />
							) : (
								<span>{item.key}</span>
							) : (
								<span>
									<Icon type={item.icon} /> <span>{item.key}</span>
								</span>
							)
						}
					>
						{item[item.key].length > 0 && (
							<Item
								style={{ backgroundColor: theme.colorGreyDark3 }}
								onClick={() => openRemoveAllModal(item.key)}
							>
								Remove all
							</Item>
						)}
						{item[item.key].map((e, i) => (
							<Item key={`sub-${iSub}-item-${i}`} onClick={() => openCalendarModal(e.createdAt)}>
								{e.title}
							</Item>
						))}
					</SubMenu>
				))}
			</Menu>
		</nav>
	);
};

SubNavigation.propTypes = {
	items: PropTypes.array.isRequired,
	openCalendarModal: PropTypes.func.isRequired,
	collapsed: PropTypes.bool.isRequired,
	className: PropTypes.string.isRequired,
	mobileView: PropTypes.bool.isRequired
};

const mapDispatchToProps = (dispatch) => ({
	openCalendarModal: (selectedDay) => dispatch(toggleCalendarModal(true, selectedDay))
});

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

const mapStateToProps = ({ items, styles }) => {
	return {
		items: Object.keys(items).map((key) => ({
			key,
			[key]: items[key],
			icon: getIcon(key)
		})),
		collapsed: styles.subNavCollapsed,
		mobileView: styles.windowWidth <= 450
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(styleSubNav(SubNavigation));
