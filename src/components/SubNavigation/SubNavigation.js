import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Menu, Layout, Icon } from 'antd';
import PropTypes from 'prop-types';

import RemoveAllModal from '../simpleModals/RemoveAllModal';
import styleSubNav from './styledSubNavigation';
import { toggleCalendarModal } from '../../actions/calendarModal';
import theme from '../../styledComponents/theme';

const { Sider } = Layout;
const { SubMenu, Item } = Menu;

const SubNavigation = ({ items, openCalendarModal, collapsed, className, mobileView }) => {
	const [ removeAllModalProps, toggleRemoveAllModal ] = useState({ modalIsOpen: false, type: undefined });

	const openRemoveAllModal = (type) => {
		toggleRemoveAllModal({ modalIsOpen: true, type });
	};

	return (
		<Sider className={className} trigger={null} collapsible collapsed={collapsed} defaultCollapsed={collapsed}>
			<RemoveAllModal removeAllModalProps={removeAllModalProps} toggleRemoveAllModal={toggleRemoveAllModal} />
			<Menu mode="inline" theme="dark" style={{ minHeight: '100%' }}>
				{items.map((item, iSub) => (
					<SubMenu
						key={`sub-${iSub}`}
						title={
							// eslint-disable-next-line no-nested-ternary
							mobileView ? (
								<span>
									<Icon type={item.icon} />
									<span>{item.key}</span>
								</span>
							) : collapsed ? (
								<Icon type={item.icon} />
							) : (
								<span>{item.key}</span>
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
		</Sider>
	);
};

SubNavigation.propTypes = {
	items: PropTypes.arrayOf(PropTypes.object).isRequired,
	openCalendarModal: PropTypes.func.isRequired,
	collapsed: PropTypes.bool.isRequired,
	className: PropTypes.string.isRequired,
	mobileView: PropTypes.bool.isRequired
};

const mapDispatchToProps = (dispatch) => ({
	openCalendarModal: (selectedDay) => dispatch(toggleCalendarModal(true, selectedDay))
});

const getIcon = (key) => {
	// eslint-disable-next-line default-case
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
		mobileView: styles.mobileView
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(styleSubNav(SubNavigation));
