import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Icon, Button } from 'antd';
import PropTypes from 'prop-types';

import { firebase } from '../../database/firebase';
import { history } from '../../routers/appRouter';
import styleNavigation, { ToggleButtonContainer, LoginButtonContainer } from './StyledNavigation';
import WeatherForm from '../WeatherForm/WeatherForm';
import MobileLogoutModal from '../simpleModals/MobileLogoutModal';

const Navigation = ({ className, collapsed, toggleCollapsed, isAuth, antdSize, mobileView }) => {
	const [ logoutModalIsOpen, toggleLogoutModal ] = useState(false);

	const onLoginButtonClick = () => {
		if (mobileView && isAuth) {
			toggleLogoutModal(true);
		} else {
			isAuth ? firebase.auth().signOut() : history.push('/login');
		}
	};

	return (
		<nav className={className}>
			<MobileLogoutModal logoutModalIsOpen={logoutModalIsOpen} toggleLogoutModal={toggleLogoutModal} />
			<ToggleButtonContainer>
				<Button size={antdSize} type="primary" onClick={toggleCollapsed}>
					<Icon type={collapsed ? 'menu-unfold' : 'menu-fold'} />
				</Button>
			</ToggleButtonContainer>
			<WeatherForm mobileView={mobileView} antdSize={antdSize} />
			<LoginButtonContainer>
				<Button size={antdSize} type="primary" onClick={onLoginButtonClick}>
					{mobileView ? <Icon type="user" /> : isAuth ? 'logout' : 'login'}
				</Button>
			</LoginButtonContainer>
		</nav>
	);
};

Navigation.propTypes = {
	className: PropTypes.string.isRequired,
	collapsed: PropTypes.bool.isRequired,
	toggleCollapsed: PropTypes.func.isRequired,
	isAuth: PropTypes.bool.isRequired,
	antdSize: PropTypes.string.isRequired,
	mobileView: PropTypes.bool.isRequired
};

const mapStateToProps = ({ auth, styles }) => {
	const { windowWidth } = styles;
	return {
		collapsed: styles.subNavCollapsed,
		isAuth: !!auth.uid,
		antdSize: windowWidth > 750 ? 'default' : 'small',
		mobileView: windowWidth <= 450
	};
};

const mapDispatchToProps = (dispatch) => ({
	toggleCollapsed: () => dispatch({ type: 'TOGGLE_SUB_NAV' })
});

export default connect(mapStateToProps, mapDispatchToProps)(styleNavigation(Navigation));
