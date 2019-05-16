import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Icon, Button } from 'antd';
import PropTypes from 'prop-types';

import { firebase } from '../../database/firebase';
import { history } from '../../routers/appRouter';
import styleNavigation, { ToggleButtonContainer, LoginButtonContainer, Logo } from './StyledNavigation';
import WeatherForm from '../WeatherForm/WeatherForm';
import MobileLogoutModal from '../simpleModals/MobileLogoutModal';

const Navigation = ({
	className,
	collapsed,
	toggleCollapsed,
	isAuth,
	antdInputsSize,
	mobileView,
	toggleSubNavVisible
}) => {
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
			{toggleSubNavVisible ? (
				<ToggleButtonContainer>
					<Button size={antdInputsSize} type="primary" onClick={toggleCollapsed}>
						<Icon type={collapsed ? 'menu-unfold' : 'menu-fold'} />
					</Button>
				</ToggleButtonContainer>
			) : (
				<Logo>Calendar.App</Logo>
			)}

			<WeatherForm mobileView={mobileView} antdInputsSize={antdInputsSize} />
			<LoginButtonContainer>
				<Button size={antdInputsSize} type="primary" onClick={onLoginButtonClick}>
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
	antdInputsSize: PropTypes.string.isRequired,
	mobileView: PropTypes.bool.isRequired,
	toggleSubNavVisible: PropTypes.bool.isRequired
};

const mapStateToProps = ({ auth, styles }) => {
	const { windowWidth, antdInputsSize } = styles;
	return {
		collapsed: styles.subNavCollapsed,
		isAuth: !!auth.uid,
		antdInputsSize,
		mobileView: windowWidth <= 450,
		toggleSubNavVisible: windowWidth <= 1140
	};
};

const mapDispatchToProps = (dispatch) => ({
	toggleCollapsed: () => dispatch({ type: 'TOGGLE_SUB_NAV' })
});

export default connect(mapStateToProps, mapDispatchToProps)(styleNavigation(Navigation));
