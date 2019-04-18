import React from 'react';
import { connect } from 'react-redux';
import { Icon, Button } from 'antd';

import { firebase } from '../../database/firebase';
import { history } from '../../routers/appRouter';
import { ToggleButtonContainer, styleNavigation } from './StyledNavigation';
import WeatherForm from '../WeatherForm';

const Navigation = ({ className, collapsed, toggleCollapsed, isAuth }) => {
	const onLoginButtonClick = () => {
		isAuth ? firebase.auth().signOut() : history.push('/login');
	};
	return (
		<div className={className}>
			<ToggleButtonContainer>
				<Button type="primary" onClick={toggleCollapsed}>
					<Icon type={collapsed ? 'menu-unfold' : 'menu-fold'} />
				</Button>
			</ToggleButtonContainer>

			<WeatherForm />
			<Button onClick={onLoginButtonClick}>{isAuth ? 'logout' : 'login'}</Button>
		</div>
	);
};

const mapStateToProps = ({ subNavigation, auth }) => ({
	collapsed: subNavigation.collapsed,
	isAuth: !!auth.uid
});

const mapDispatchToProps = (dispatch) => ({
	toggleCollapsed: () => dispatch({ type: 'TOGGLE_SUB_NAV' })
});

export default connect(mapStateToProps, mapDispatchToProps)(styleNavigation(Navigation));
